import React, { Component } from "react";
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Deck from '../components/Deck/Deck'
import PlayerAction from '../components/Player/PlayerAction/PlayerAction'
import Player from '../components/Player/Player'
import PlayerHand from '../components/Player/PlayerHand/PlayerHand'
import Modal from '../hoc/Modal'
import { DefaultButton, ActionButton } from "../components/UI";
import { updateObject, matchArrayInArray } from '@shared/utilityFunctions'
import * as actions from '@store/actions'
import * as storeVariables from '@store/storeVariables'

const Wrapper = styled.View`
    flex: 1;
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
        peek: {
            peeking: false,
            peeked: false,
            selected: [],
        },
        slap: {
            slapping: false
        },
        tap: {
            tapping: false,
            tapped: false
        }
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
            
            const updatedPlayer = updateObject(player, { hand })
    
            this.props.onSwapCards(drawPile, updatedPlayer)
        }
        this.changeSlapStageHandler()
    }

    changePeekStateHandler = stage => {
        const { peek } = this.state

        this.setState(prevState => {
            return {
                peek: updateObject(peek, {
                    [stage]: !prevState.peek[stage]
                })
            }
        })
    }

    changeSlapStageHandler = () => {
        const { slap } = this.state

        this.setState(prevState => {
            return {
                slap: updateObject(slap, {
                    slapping: !prevState.slap.slapping
                })
            }
        })
    }

    tappingHandler = () => {
        const { tap } = this.state

        this.setState(prevState => {
            return {
                tap: updateObject(tap, {
                    tapping: !prevState.tap.tapping
                })
            }
        })
    }

    tappedHandler = () => {
        const { tap } = this.state

        this.setState({ tap: updateObject(tap, {
            tapped: true
        })})
    }

    peekCardsHandler = (handCoordinates) => {
        const { peek } = this.state
        const { selected } = peek
        const index = matchArrayInArray(selected, handCoordinates)

        if (index === -1) {
            if (selected.length === 2) return
            selected.unshift(handCoordinates)
        } else {
            selected.splice(index, 1)
        }

        this.setState({ peek: updateObject(peek, { selected }) })
    }

    peekPhaseHandler = () => {
        const { peek } = this.state
        const cardPressed = this.peekCardsHandler
        let buttonPressed = () => this.changePeekStateHandler('peeking')
        let peekButtonText = 'reveal'
        let action = storeVariables.CARD_ACTION_PEEK_SELECT

        if (peek.peeking) {
            buttonPressed = () => {
                const startTime = new Date().getTime()
                console.log('[CardDemo] startTime: ', startTime)
                this.changePeekStateHandler('peeked')
                this.props.onLaunchGame(startTime)
            }
            peekButtonText = 'ready'
            action = storeVariables.CARD_ACTION_PEEKING
        }

        return (
            <React.Fragment>
                <PlayerHand 
                    hand={this.props.player.hand}
                    selected={peek.selected}
                    pressed={cardPressed}
                    cardAction={action}
                    />
                <DefaultButton
                    onPress={buttonPressed}
                    disabled={this.state.peek.selected.length !== 2}>
                    {peekButtonText}
                </DefaultButton>
            </React.Fragment>
        )
    }

    pileClickedHandler = pile => {
        return this.props.phase === storeVariables.PHASE_DRAW ?
            this.props.onDrawCard(pile) : null
    }


    render() {
        let modalContent = null
        const { discardPile, drawPile, player } = this.props

        console.log('[CardDemo] this.props.game: ', this.props.game)

        if (drawPile.length === 0) this.props.onEmptyDrawPile(discardPile)

        if (!this.props.isDealt) {
            modalContent = (
                <DefaultButton
                    onPress={this.dealCardsHandler}
                    >
                    deal
                </DefaultButton>
            )
        } else if (this.props.phase === storeVariables.PHASE_PEEK) {
            modalContent = this.peekPhaseHandler()
        } else if (this.props.phase === storeVariables.PHASE_SWAP) {
            modalContent = (
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
        } else if (this.state.slap.slapping) {
            modalContent = (
                <React.Fragment>
                    <PlayerHand 
                        hand={this.props.player.hand}
                        pressed={this.slapCardHandler}
                        cardAction={storeVariables.CARD_ACTION_SLAP}
                        />
                    <ActionButton
                        onPress={this.changeSlapStageHandler}
                        >
                        Cancel
                    </ActionButton>
                </React.Fragment>
            )
        } else if (this.state.tap.tapped) {
            modalContent = (
                <React.Fragment>
                    <FinalScore>
                        <ScoreText>
                            final score: {player.totalPoints}
                        </ScoreText>
                    </FinalScore>
                    <PlayerHand 
                        hand={this.props.player.hand}
                        cardAction={storeVariables.CARD_ACTION_TAPPED}
                        />
                </React.Fragment>
            )
        } else if (this.state.tap.tapping) {
            modalContent = (
                <React.Fragment>
                    <ActionButton
                        onPress={this.tappedHandler}
                        >
                        tap now
                    </ActionButton>
                    <ActionButton
                        onPress={this.tappingHandler}
                        >
                        Cancel
                    </ActionButton>
                </React.Fragment>
            )
        } 

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
                    slapHandler={this.changeSlapStageHandler}
                    />
                <Player
                    tappingHandler={this.tappingHandler}
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
        startTime: state.game.startTime,
        game: state.game
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
        onLaunchGame: startTime => dispatch(actions.launchGame(startTime))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDemo)
