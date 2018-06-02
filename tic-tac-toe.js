/**
 * Developer: Alberto Kato
 * Date: May 30th 2018.
 */

/*types available*/
const X_TYPE = 'X';
const O_TYPE = 'O';

/*Difficulty settings cost*/
const EASY_DIFFICULTY = 'easy';
const NORMAL_DIFFICULTY = 'normal';
const IMPOSSIBLE_DIFFICULTY = 'impossible';
const CELLS_IDS = ['1','2','3','4','5','6','7','8','9'];

const USER_TURN  = 'user';
const COMPUTER_TURN = 'computer';

var userType;
var computerType;
var difficultySettings;
var winner;
var winnerIds;
var currentTurn = USER_TURN;
 

$(function(){
	

	$('.grid').click(function() {
		//GAME LOGIC
		//MOVES
		userMove($(this).attr('id'),userType);

		if (endGame()) return;
		
		computerEasyMove();
		
		if (endGame()) return;
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
	console.log(userType);
	console.log(difficultySettings);
	hideSettingsMenu();
}

function hideSettingsMenu()
{
	$('#settingsForm').hide();
}

function haveWonHorizontal()
{
	var horizontalSequence = [
		['1','2','3'],
		['4','5','6'],
		['7','8','9']
	];

	return  isThereAWinnerInTheMatrix(3,3,horizontalSequence);
	
}

function haveWonVertial() 
{
	var verticalSequence = [
		['1','4','7'],
		['2','5','8'],
		['3','6','9']
	];

	return  isThereAWinnerInTheMatrix(3,3,verticalSequence);
}

function haveWonDiagonal()
{
	var diagonalSequence = [
		['1','5','9'],
		['3','5','7']
	];

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
function computerEasyMove()
{
	var availableSpotsInGrid = getEmptyCellsIds();
	setCurrentTurn(COMPUTER_TURN);
	setImg(availableSpotsInGrid.pop(),computerType);
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
	var end = false;

	if (haveWonHorizontal() || haveWonVertial() || haveWonDiagonal()) {

		for (var i = 0; i < winnerIds.length; i++) {
			
			$('#' + winnerIds[i]).css('background-color','#40E2A0');
		}
		
		end = true;	
	}

	return end;
}
