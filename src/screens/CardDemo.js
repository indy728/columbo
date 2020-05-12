import React, { Component } from "react";
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Deck from '../components/Deck/Deck'
import PlayerAction from '../components/Player/PlayerAction/PlayerAction'
import Player from '../components/Player/Player'
import PlayerHand from '../components/Player/PlayerHand/PlayerHand'
import Modal from '../hoc/Modal'
import { DefaultButton, ActionButton } from "../components/UI";
import { updateObject, matchArrayInArray, toggleBooleanStateHandler } from '@shared/utilityFunctions'
import * as actions from '@store/actions'
import * as storeVariables from '@store/storeVariables'

const Wrapper = styled.View`
    flex: 1;
    padding-top: 50px;
    background-color: ${({ theme }) => theme.palette.grayscale[5]};
`

const FinalScore = styled.View`
    width: 80%;
    padding: 30px 0;
    margin-bottom: 50px;
    background-color: ${({ theme }) => theme.palette.grayscale[1]};
    align-items: center;
`

const ScoreText = styled.Text`
    font-size: 20px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.white[0]};
`

class CardDemo extends Component {

    state = {
        selected: [],
        slapping: false,
        tapping: false,
        endGameDetails: false
    }

    findFirstEmptyCardSlot = hand => {
        let i = 0

        while (i < hand.length) {
            let j = 0
            while (j < 2) {
                if (!hand[i][j]) {
                    return ([i, j])
                }
                j++
            }
            i++
        }
        return null
    }

    dealCardsHandler = () => {
        const { drawPile, player } = this.props
        const { hand } = player

        for (let i = 0; i < 4; i++) {
            let firstEmptyCardSlot = this.findFirstEmptyCardSlot(hand)
            let card = drawPile.shift()

            if (!firstEmptyCardSlot) {
                hand.push([card, null])
            } else {
                hand[firstEmptyCardSlot[0]][firstEmptyCardSlot[1]] = card
            }
        }

        const updatedPlayer = updateObject(player, { hand })

        this.props.onDealCards(drawPile, updatedPlayer)
    }

    swapCardsHandler = (cardLocationArray) => {
        const { player, discardPile, currentCard } = this.props
        const { hand } = player
        const col = cardLocationArray[0]
        const row = cardLocationArray[1]

        discardPile.unshift(hand[col][row])
        hand[col][row] = currentCard

        this.props.onSwapCards(discardPile, updateObject(player, { hand }))
    }

    columnIsEmpty = column => {
        return column[0] === null && column[1] === null
    }

    cleanUpHand = (hand, isFront) => {
        if (isFront) {
            let column = hand[0]
            while (hand.length > 1 && this.columnIsEmpty(column)) {
                hand.shift()
                column = hand[0]
            }
        } else {
            while (hand.length > 1 && this.columnIsEmpty(hand[hand.length - 1])) {
                hand.pop()
            }
        }
    }



    slapCardHandler = (cardLocationArray) => {
        const { player, discardPile, drawPile } = this.props
        const { hand } = player
        const col = cardLocationArray[0]
        const row = cardLocationArray[1]
        const topCard = discardPile[0]

        if (hand[col][row] && hand[col][row].value === topCard.value) {
            discardPile.unshift(hand[col][row])
            hand[col][row] = null
            if (col == 0) this.cleanUpHand(hand, true)
            if (col == hand.length - 1) this.cleanUpHand(hand, false)
            this.props.onSlapCards(discardPile, updateObject(player, { hand }))
        } else {
            for (let i = 0; i < 2; i++) {
                let firstEmptyCardSlot = this.findFirstEmptyCardSlot(hand)
                let card = drawPile.shift()
    
                if (!firstEmptyCardSlot) {
                    hand.push([card, null])
                } else {
                    hand[firstEmptyCardSlot[0]][firstEmptyCardSlot[1]] = card
                }
            }
            this.props.onSwapCards(drawPile, updateObject(player, { hand }))
        }
        this.setState({ slapping: false })
    }

    tappedHandler = () => {
        const endTime = new Date().getTime()

        this.setState({ tapping: false })
        this.props.onInitDeck()
        this.props.onTapRound(endTime)
    }
    
    peekCardsHandler = (handCoordinates) => {
        const { selected } = this.state
        const index = matchArrayInArray(selected, handCoordinates)

        if (index === -1) {
            if (selected.length === 2) return
            selected.unshift(handCoordinates)
        } else {
            selected.splice(index, 1)
        }

        this.setState({ selected })
    }

    peekPhaseHandler = () => {
        const { selected } = this.state
        const { phase } = this.props
        const cardPressed = this.peekCardsHandler
        let buttonPressed = () => this.props.onUpdatePhase(storeVariables.PHASE_PEEKING)
        let peekButtonText = 'reveal'
        let action = storeVariables.CARD_ACTION_PEEK_SELECT

        if (phase === storeVariables.PHASE_PEEKING) {
            buttonPressed = () => {
                const startTime = new Date().getTime()
                this.setState({ selected: [] })
                this.props.onLaunchRound(startTime)
            }
            peekButtonText = 'ready'
            action = storeVariables.CARD_ACTION_PEEKING
        }

        return (
            <React.Fragment>
                <PlayerHand 
                    hand={this.props.player.hand}
                    selected={selected}
                    pressed={cardPressed}
                    cardAction={action}
                    />
                <DefaultButton
                    onPress={buttonPressed}
                    disabled={selected.length !== 2}>
                    {peekButtonText}
                </DefaultButton>
            </React.Fragment>
        )
    }

    pileClickedHandler = pile => {
        return this.props.phase === storeVariables.PHASE_DRAW ?
            this.props.onDrawCard(pile) : null
    }

    modalContentByPhase = phase => {
        const { PHASE_PEEK, PHASE_PEEKING, PHASE_SWAP, PHASE_TAPPED, PHASE_PLAY, CARD_ACTION_SWAP, CARD_ACTION_TAPPED} = storeVariables

        switch(phase) {
            case PHASE_PEEK:
            case PHASE_PEEKING:
                return this.peekPhaseHandler()
            case PHASE_SWAP:
                return (
                    <React.Fragment>
                        <PlayerHand 
                            hand={this.props.player.hand}
                            pressed={this.swapCardsHandler}
                            cardAction={storeVariables.CARD_ACTION_SWAP}
                            />
                        <ActionButton
                            onPress={() => this.props.onUpdatePhase(storeVariables.PHASE_PLAY)}
                            >
                            Cancel
                        </ActionButton>
                    </React.Fragment>
                )
            case PHASE_TAPPED:
                const { round } = this.props

                return (
                    <React.Fragment>
                        <FinalScore>
                            <ScoreText>
                                final score: {round.points}
                            </ScoreText>
                            <ScoreText>
                                turns taken: {round.turns}
                            </ScoreText>
                            <ScoreText>
                                time: {this.getRoundDuration(round)} seconds
                            </ScoreText>
                        </FinalScore>
                        <PlayerHand 
                            hand={this.props.player.hand}
                            cardAction={storeVariables.CARD_ACTION_TAPPED}
                            />
                        <ActionButton
                            onPress={this.props.onEndRound}
                            >
                            next round
                        </ActionButton>
                        <ActionButton
                            onPress={this.tappedHandler}
                            >
                            tap now
                        </ActionButton>
                    </React.Fragment>
                )
            default:
                return null
        }
    }

    getRoundDuration = round => {
        return (+(round.endTime) - +(round.startTime)) / 1000
    }

    setEndGameContent = () => {
        let points = 0
        let turns = 0
        let duration = 0
        const { rounds } = this.props.player

        for (let i in rounds) {
            points += rounds[i].points
            turns += rounds[i].turns
            duration += this.getRoundDuration(rounds[i])
        }

        let endGameContent = (
            <React.Fragment>
                <FinalScore>
                    <ScoreText>
                        final score: {points}
                    </ScoreText>
                    <ScoreText>
                        turns taken: {turns}
                    </ScoreText>
                    <ScoreText>
                        time taken: {duration} seconds
                    </ScoreText>
                    <ActionButton onPress={() => toggleBooleanStateHandler(this, 'endGameDetails')}>show round details</ActionButton>
                </FinalScore>
                <DefaultButton>
                    play again
                </DefaultButton>
                <DefaultButton>
                    home screen
                </DefaultButton>
            </React.Fragment>
        )

        if (this.state.endGameDetails) {
            endGameContent = rounds.map((round, i) => {
                return (
                    <FinalScore key={'round' + i}>
                        <ScoreText>
                            final score: {round.points}
                        </ScoreText>
                        <ScoreText>
                            turns taken: {round.turns}
                        </ScoreText>
                        <ScoreText>
                            duration: {this.getRoundDuration(round)}
                        </ScoreText>
                    </FinalScore>
                )
            })
        }

        return endGameContent
    }

    render() {
        let modalContent = null
        const { discardPile, drawPile, player, round, phase, gameStatus } = this.props

        if (drawPile.length === 0) this.props.onEmptyDrawPile(discardPile)

        if (!this.props.isDealt) modalContent = <DefaultButton onPress={this.dealCardsHandler}>deal</DefaultButton>
        else if (gameStatus === storeVariables.GAME_STATUS_POST_GAME) modalContent = this.setEndGameContent()
        else if (this.state.slapping) {
            modalContent = (
                <React.Fragment>
                    <PlayerHand 
                        hand={this.props.player.hand}
                        pressed={this.slapCardHandler}
                        cardAction={storeVariables.CARD_ACTION_SLAP}
                        />
                    <ActionButton
                        onPress={() => toggleBooleanStateHandler(this, 'slapping')}
                        >
                        Cancel
                    </ActionButton>
                </React.Fragment>
            )
        } else if (this.state.tapping) {
            modalContent = (
                <React.Fragment>
                    <ActionButton
                        onPress={this.tappedHandler}
                        >
                        tap now
                    </ActionButton>
                    <ActionButton
                        onPress={() => toggleBooleanStateHandler(this, 'tapping')}
                        >
                        Cancel
                    </ActionButton>
                </React.Fragment>
            )
        } 
        else modalContent = this.modalContentByPhase(phase)
        // else if (phase === storeVariables.PHASE_PEEK || phase === storeVariables.PHASE_PEEKING) modalContent = this.peekPhaseHandler()
        // else if (phase === storeVariables.
        // }
       
        // else if (phase === storeVariables.
        // }
        

        const modalVisible = modalContent !== null

        return (
            <Wrapper>
                <Modal visible={modalVisible}>
                    {modalContent}
                </Modal>
                <Deck
                    discardPile={discardPile}
                    drawPile={drawPile}
                    pileClickedHandler={this.pileClickedHandler}
                    slapping={this.state.slapping}
                    />
                <PlayerAction
                    slapHandler={() => toggleBooleanStateHandler(this, 'slapping')}
                    />
                <Player
                    tappingHandler={() => toggleBooleanStateHandler(this, 'tapping')}
                    />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawPile: state.deck.drawPile,
        discardPile: state.deck.discardPile,
        currentCard: state.deck.currentCard,
        player: state.game.player,
        isDealt: state.game.isDealt,
        phase: state.game.phase,
        gameStatus: state.game.gameStatus,
        round: state.game.round,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrawCard: card => dispatch(actions.drawCard(card)),
        onDealCards: (drawPile, player) => dispatch(actions.dealCards(drawPile, player)),
        onSwapCards: (discard, player) => dispatch(actions.swapCards(discard, player)),
        onSlapCards: (discard, player) => dispatch(actions.slapCard(discard, player)),
        onUpdatePhase: phase => dispatch(actions.updatePhase(phase)),
        onEmptyDrawPile: discardPile => dispatch(actions.rebuildDrawPileFromDiscardPile(discardPile)),
        onLaunchRound: startTime => dispatch(actions.launchRound(startTime)),
        onEndRound: () => dispatch(actions.endRound()),
        onTapRound: endTime => dispatch(actions.tapRound(endTime)),
        onInitDeck: () => dispatch(actions.initDeck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDemo)
