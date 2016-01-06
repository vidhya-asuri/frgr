# Frogger - by Vidhya
This is my implementation of the classic arcade game Frogger.The game has one player who has to dodge an enemy bug and a CatGirl to get across the canvas to the water.Game restarts automatically when player has reached water and still has lives left.  Player and enemies get reset to starting positions every time player reaches water.

#### Game information
**Number of players:** 1

**Number of lives for player:** 3

**Number of enemies:** 2

**Goal:** Get player across the canvas to the water without coming in contact with either of the two enemies - Bug and CatGirl.

**Points:** Every successful (success = player does not meet Enemy) up arrow key press earns the player 10 points, down arow key press takes away 5 points. No points are earned or lost for any other key press.

**What happens when player wins - gets to the water:**  A Star is displayed (shown and then hidden) under the number-of-wins text every time the player reaches the water. Number of Wins text is updated.

**What happens when player loses a life:** Player and enemies are repositioned to their respective starting positions. Number of lives left text is updated (reduced by 1).

**What happens when player loses all 3 lives:** JQuery dialog is displayed leting the player know that he has no more lives left; prompts the user to choose whether he wants to restart the game or quit.

**What happens player chooses Quit in the dialog boxes presented to him:** Score gets reset to 0, Number of lives gets reset to 3 (max lives), Number of Wins gets reset to 0.

**What happens player chooses Restart button after he has lost all three lives:** Score gets reset to 0, Number of lives gets reset to 3 (max lives), Number of Wins gets reset to 0.

