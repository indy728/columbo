# Columbo Mobile

A mobile card game app based on a high-speed, attack variation of the single-deck game called Golf.

## Motivation

This app idea came out of COVID-19 shelter in place order. The basics of gameplay are simple, with clear stepping stones for learning React Native development as well as basic game development. When the multiplayer is complete, it will be an effective social game for physical distancing.

## The Game

### Deal

The dealer position rotates from player to player around the table in a clockwise manner, changing at the end of every deal. Each player is dealt four cards and then arranges his cards face down to create a two-by-two grid. Players are permitted to look at any two cards before placing them back on the table face down. From that point, players are not allowed to look at their cards unless making a play with one of them.

### Objective
Players attempt to create a combination of cards in hand with the lowest possible point value. Aces are worth one point, numbered cards are worth their value; jacks, queens and kings are worth 11, 12 and 13 points, respectively. A king of hearts is worth negative one (-1) point, making it the best card to have in hand at the end of the game. Point totals are recorded at the end of each round. The player with the lowest point total at the end of the agreed amount of rounds (typically 4 rounds) wins the game.

### Play
#### Basic Gameplay:
The player to the left of the dealer goes first. They may take the top card off the discard pile and exchange it with one of their four cards, placing their original card in the discard pile (face-up). Or they may take the top card off the deck and either exchange it in similar fashion or, if the card is not to their liking, place it in the discard pile. Play rotates around the table in a clockwise manner. Players may exchange their cards as many times as they like. When a player thinks they has achieved his lowest possible score for the hand, they "tap" on their turn. A player must have fewer than four points to tap or incur a penalty of 25 points at the end of the round in addition to their point total. Every other player gets one more turn.

#### Card Actions
Some cards, once discarded, allow the discarding player to execute an action associated with the card value. The action must occur before the next player in rotation draws a card. If the player with the option to action does not indicate that they will use the action, the next player may draw and thus prevent the player to last discard from remembering to execute their action.

Actions by card value are as follows:
- 7, 8: Look at one of another player's cards.
- 9, 10: Look at one of your own cards.
- Jack: Without looking, swap any two in-hand cards on the table from any player (blind swap).
- Queen: Look at one card from any hand on the table. Then swap any two in-hand cards on the table from any player (look and swap).

#### Card Slaps
Players also have the opportunity to reduce the number of cards in their hand via the slap action. A player may slap a card from their hand (that was face down) upon the last-played card in the discard pile. If the slapped card is match of value to the top card on the discard pile (ie: six of hearts on six of spades), the slapping player may leave the slapped card on the discard pile, thus having reduced the number of cards in their hand by one. If the slapped card is not a match, that player must return that card to its original place in their hand, and additionally draw another card to add to their hand. The drawn card must remain face-down, unseen. Slapped cards do not get to execute their associated action. Additionally, a slapping may only occur once per discard; slapping may not be chained. In the event that two people attempt to slap at the same time, slapping action goes to the player whose card is first down on the discard pile.

Players may also slap from opponents hands. A successful slap of an opponents cards deals them one card from the deck to replace the card slapped, as well as one additional card (both face-down, unseen). An unsuccessful slap returns the slapped card to its original player's hand, and the slapping player must draw **two** cards from the deck to be added to their own hand.

## The Program
### Playable Game Mechanics
- Create single-player game
- Shuffle deck at round start or shuffle draw pile to become deck once the deck has been fully drawn
- Peek 2 cards
- Draw from deck or discard pile
- Swap or discard drawn card
- Slap from own hand
  - Success: player is less one card
  - Failure: player is returned slapped card and dealt one additional
- Tap to end round
- Start a new round
- Initial scoring for single player based on cards in hand, rounds before tap and time elapsed before tap.

### Mechanics To Be Implemented:
- Card actions
- Rounds count and game total
- Multiplayer*

*Multiplayer presents logistical issues regarding realtime game play (for slapping game mechanics). My first attempt will be to attempt to use a pub/sub service and publish directives in as small packages as possible to the subscribed channel so that all users with solid internet connection can have a fair chance to compete on any given action.

### Features To Be Implemented
- User login
  - Photo/avatar & display name
  - User screen with single player stats
    - rounds played
    - low score (based on point total and time elapsed or rounds before tap)

## Visualization
<img src="/public/gif/start.gif" alt="Start" width="350">
<img src="/public/gif/play-swap.gif" alt="Play & Swap" width="350">

<img src="/public/gif/slap-fail.gif" alt="Slap Fail" width="350">
<img src="/public/gif/slap-success.gif" alt="Slap Success" width="350">

<img src="/public/gif/tap.gif" alt="Tap" width="350">

## Last Update
June 30, 2020: End game score

<!-- <img src="/Users/kylemurray/indy-react-spa-template/public/img/mobile.gif" alt="Mobile GIF" width="300"> -->