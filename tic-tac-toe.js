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

var userType;
var computerType;
var difficultySettings;
var winner;
	
$(function(){
	

	$('.grid').click(function(){
		setImg($(this).attr('id'));
	})
})

function setImg(cellId) 
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
	let xMark = 0;
	let oMark = 0;

	$('#board > .row').each(function(){
		
		let src;
		oMark = 0;
		xMark = 0;

		$('.grid',this).each(function() {
			
			src = $(this).find('img').attr('src');
			
			if (src == null) {
				return false;
			}

			if (src == 'img/circle.png') {
				oMark++;
			}
			else {
				xMark++;
			}
		});
		
		if (oMark == 3) {
			setWinner(O_TYPE);
			return false;	
		}

		if (xMark == 3) {
			setWinner(X_TYPE);
			return false;
		}

	});

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
