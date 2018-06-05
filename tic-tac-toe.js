/** 
 * 	  _  __     _           _____                                 _   _             
 *	 | |/ /    | |         / ____|                               | | (_)            
 *	 | ' / __ _| |_ ___   | |     ___  _ __ _ __   ___  _ __ __ _| |_ _  ___  _ __  
 *	 |  < / _` | __/ _ \  | |    / _ \| '__| '_ \ / _ \| '__/ _` | __| |/ _ \| '_ \ 
 *	 | . \ (_| | || (_) | | |___| (_) | |  | |_) | (_) | | | (_| | |_| | (_) | | | |
 *	 |_|\_\__,_|\__\___/   \_____\___/|_|  | .__/ \___/|_|  \__,_|\__|_|\___/|_| |_|
 *	                                       | |                                      
 *	                                       |_|                                       
 *
 * 											presents:
 *		
 *			 _____ _          _____               _____           
 * 			/__   (_) ___    /__   \__ _  ___    /__   \___   ___ 
 *			  / /\/ |/ __|____ / /\/ _` |/ __|____ / /\/ _ \ / _ \
 *			 / /  | | (_|_____/ / | (_| | (_|_____/ / | (_) |  __/
 *			 \/   |_|\___|    \/   \__,_|\___|    \/   \___/ \___|
 *			                                                      
 * Developer: 41 6C 62 65 72 74 6F  53 75 73 73 75 6D 75  4B 61 74 6F  4A 75 6E 69 6F 72 
 * Date: May 30th 2018.
 * Contact: albertokatojr at gmail dot com
 * 
 */

/*types available*/
const X_TYPE = 'X';
const O_TYPE = 'O';

/*Difficulty settings cost*/
const EASY_DIFFICULTY = 'easy';
const NORMAL_DIFFICULTY = 'normal';
const IMPOSSIBLE_DIFFICULTY = 'impossible';
const CELLS_IDS = ['1','2','3','4','5','6','7','8','9'];
const horizontalSequence = [
		['1','2','3'],
		['4','5','6'],
		['7','8','9']
	];
const verticalSequence = [
		['1','4','7'],
		['2','5','8'],
		['3','6','9']
	];
const diagonalSequence = [
		['1','5','9'],
		['3','5','7']
	];
const USER_TURN  = 'user';
const COMPUTER_TURN = 'computer';

var userType;
var computerType;
var difficultySettings;
var winner;
var winnerIds;
var currentTurn = USER_TURN;
var victoriesUser = 0;
var victoriesComputer = 0;
var draws = 0;

 

$(function(){
	

	$('.grid').click(function() {
		//GAME LOGIC
		//MOVES
		if (winner != null) {
			return;
		}
		userMove($(this).attr('id'),userType);

		if (endGame()) {
			showBtnPlayAgain();
			return;
		}
		
		computerMove();
		
		if (endGame()) {
			showBtnPlayAgain();
			return;
		} 
	});
})

function setImg(cellId,userType) 
{
	cellId = '#' + cellId; 
	
	if (isGridCellEmpty(cellId)) {
		$(cellId).append(getImg(userType));
		$(cellId).addClass('not-empty');
	}
}

function getImg(userType)
{
	switch(userType) {
		case X_TYPE:
			return getXImg();
			break;
		case O_TYPE:
			return getCircleImg();
			break;
		default:
			return false;
	}
}

function getCircleImg()
{
	return '<img src="img/circle.png" class="img-responsive"/>';
}

function getXImg()
{
	return '<img src="img/x.png" class="img-responsive"/>';
}

function isGridCellEmpty(cellId)
{
	return !$(cellId).hasClass('not-empty');
}

function setUserType(selectedType)
{
	if (selectedType == X_TYPE) {
		userType = X_TYPE;
		computerType = O_TYPE;
	}
	else {
		//default
		userType = O_TYPE;
		computerType = X_TYPE;	
	}
}

function setUserDifficultySettings(selectedDifficulty)
{
	if (selectedDifficulty == IMPOSSIBLE_DIFFICULTY) {

		difficultySettings = IMPOSSIBLE_DIFFICULTY;
	}
	else if (selectedDifficulty == NORMAL_DIFFICULTY) {
		difficultySettings = NORMAL_DIFFICULTY;
	}
	else {
		//default
		difficultySettings = EASY_DIFFICULTY;
	}
}

function setUserPreferences()
{
	setUserType($('#selectType').val());
	setUserDifficultySettings($('#selectDificulty').val());
	hideSettingsMenu();
	showBoards();
}

function hideSettingsMenu()
{
	$('#settingsForm').hide();
}

function showBoards()
{
	$('#scoreBoard').show();
	$('#board').show();
}

function haveWonHorizontal()
{
	return  isThereAWinnerInTheMatrix(3,3,horizontalSequence);	
}

function haveWonVertial() 
{
	return  isThereAWinnerInTheMatrix(3,3,verticalSequence);
}

function haveWonDiagonal()
{
	return isThereAWinnerInTheMatrix(2,3,diagonalSequence);
}

function isThereAWinnerInTheMatrix(line,column,matrix)
{
	var i,j,xMark,oMark;

	for (i=0; i < line; i++) {
		
		xMark = 0;
		oMark = 0;
		winnerIds = [];

		for(j=0; j < column; j++) {

			src = $('#cell-' + matrix[i][j]).find('img').attr('src');
			winnerIds[j] = 'cell-' + matrix[i][j];
			if (src == null) {
				break;
			}
			if (src == 'img/circle.png') {
				oMark++;
			}
			else {
				xMark++;
			}
		}

		if (oMark == 3) {
			setWinner(O_TYPE);
			setWinnerCellIds(winnerIds);
			break;	
		}

		if (xMark == 3) {
			setWinner(X_TYPE);
			setWinnerCellIds(winnerIds);
			break;
		}
	}

	if (winner == null) {
		return false;
	} else {
		return true;
	}
}


function setWinner(winnerType)
{
	winner = winnerType;
}

function setWinnerCellIds(arrayIds)
{
	winnerIds = arrayIds;
}

function getEmptyCellsIds()
{
	var ids = [];
	for (var i = 0 ; i <= CELLS_IDS.length ; i++) {
		if (isGridCellEmpty('#cell-' + CELLS_IDS[i])) {
			
			if (CELLS_IDS[i] != null) {
				ids.push('cell-' + CELLS_IDS[i]);
			}
			
		}
	}

	return ids;
}


function setCurrentTurn(turnTypeUser)
{
	currentTurn = turnTypeUser;
}

//----------------MOVES----------------
//COMPUTER-MOVE
function computerMove()
{
	switch (difficultySettings) {

		case (NORMAL_DIFFICULTY):
			computerUnpredictableMove();
			break;
		case (IMPOSSIBLE_DIFFICULTY):
			computerSmartMove();
			break;
		default:
			computerPredictableMove();
			break;
	}
}

function computerPredictableMove()
{
	var availableSpotsInGrid = getEmptyCellsIds();
	setCurrentTurn(COMPUTER_TURN);
	setImg(availableSpotsInGrid.pop(),computerType);
}

function computerUnpredictableMove()
{
	let availableSpotsInGrid = getEmptyCellsIds();
	setCurrentTurn(COMPUTER_TURN);
	let randomIndex = Math.floor(Math.random()*availableSpotsInGrid.length); 
	setImg(availableSpotsInGrid[randomIndex],computerType);
}

function computerSmartMove()
{
	arrayIndex = getWhereUserIsAboutToWin();
	
	if (arrayIndex && arrayIndex.length > 0) {
		setCurrentTurn(COMPUTER_TURN);
		setImg('cell-' + arrayIndex.pop(),computerType);
	}
	else {
		computerUnpredictableMove();
	} 
}

function getWhereUserIsAboutToWin()
{
	var indexNotAllowUserVictory = [];
	var computerVictory = [];
	var imgUserTypeName = (userType == O_TYPE) ? 'img/circle.png' : 'img/x.png';
	var imgComputerTypeName = (computerType == O_TYPE) ? 'img/circle.png' : 'img/x.png';
	//console.log('user:' + imgUserTypeName,' computer: ' + imgComputerTypeName);
	//horizontal
	for (let i = 0; i < 3; i++) {
		
		let userMark = 0;
		let computerMark = 0;

		for (let j = 0; j < 3; j++) {

			src = $('#cell-' + horizontalSequence[i][j]).find('img').attr('src');
			
			if (src == null) {
				indexNotAllowUserVictory.push(horizontalSequence[i][j]);
				computerVictory.push(horizontalSequence[i][j]);
			}

			if (src == imgUserTypeName) {
				userMark++;
			}
			if (src == imgComputerTypeName) {
				computerMark++;
			}
		}
	

		if (computerMark == 2) {
			return computerVictory;
		}
		if (userMark == 2) {
			return indexNotAllowUserVictory;
		}
		indexNotAllowUserVictory = [];
		computerVictory = [];
	}
	//Vertical
	for (let i = 0; i < 3; i++) {
		
		let userMark = 0;
		let computerMark = 0;
		
		for (let j = 0; j < 3; j++) {

			src = $('#cell-' + verticalSequence[i][j]).find('img').attr('src');

			if (src == null) {
				indexNotAllowUserVictory.push(verticalSequence[i][j]);
				computerVictory.push(verticalSequence[i][j]);
			}


			if (src == imgComputerTypeName) {
				computerMark++;
			}
			if (src == imgUserTypeName) {
				userMark++;
			}
		}

		if (computerMark==2) {
			return computerVictory;
		}
		if (userMark==2) {
			return indexNotAllowUserVictory;
		}
		indexNotAllowUserVictory = [];
		computerVictory = [];
	}

	//Diagonnal
	for (let i = 0; i < 2; i++) {
		
		let userMark = 0;
		let computerMark = 0;

		for (let j = 0; j < 3; j++) {

			src = $('#cell-' + diagonalSequence[i][j]).find('img').attr('src');
			
			if (src == null) {
				indexNotAllowUserVictory.push(diagonalSequence[i][j]);
				computerVictory.push(diagonalSequence[i][j]);
			}

			if (src == imgUserTypeName) {
				userMark++;
			}

			if (src == imgComputerTypeName) {
				computerMark++;
			}
		}
		console.log(computerMark);
		if (computerMark==2) {
			return computerVictory;
		}

		if (userMark==2) {
			return indexNotAllowUserVictory;
		}
		computerVictory = [];
		indexNotAllowUserVictory = [];

	}

	return false;
}

//USER-MOVE
function userMove(cellId)
{
	setCurrentTurn(USER_TURN);
	setImg(cellId,userType);	
}

//----------------GAME FLOW----------------
function endGame()
{

	if (haveWonHorizontal() || haveWonVertial() || haveWonDiagonal()) {

		for (let i = 0; i < winnerIds.length; i++) {
			
			$('#' + winnerIds[i]).css('background-color','#40E2A0');
		}

		incrementWinnerScore();
		
		return true;
	}

	else if (isDraw()) {

		for (let i = 0; i < CELLS_IDS.length; i++) {
			
			$('#cell-' + CELLS_IDS[i]).css('background-color','black');
		}

		incrementDrawNumber();

		return true;
	}

	else {
		return false;
	}
}

function isDraw()
{
	return getEmptyCellsIds().length  == 0;
}

function incrementDrawNumber()
{
	draws++;
	$('#drawScore').text(draws);
}

function incrementWinnerScore()
{
	if (winner == userType) {
		victoriesUser++;
		$('#userScore').text(victoriesUser);
	}
	else {
		victoriesComputer++;
		$('#computerScore').text(victoriesComputer);
	}
}

function showBtnPlayAgain()
{
	$('#btnPlayAgain').show();
}

function hideBtnPlayAgain()
{
	$('#btnPlayAgain').hide();
}



function newGameMatch()
{
	hideBtnPlayAgain();
	clearBoard();
	setWinner(null);
	setCurrentTurn(userType);
}

function restartGame()
{
	location.reload();
}

function clearBoard()
{
	for (let i = 0; i < CELLS_IDS.length; i++) {
		cell = $('#cell-' + CELLS_IDS[i]);
		
		if (!isGridCellEmpty(cell)) {
			cell.removeClass('not-empty');
			cell.find('img').remove();
			cell.css('background-color','#FFFFFF');
		}
	}
}