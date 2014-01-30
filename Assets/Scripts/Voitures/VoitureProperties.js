#pragma strict

enum VoitureState
{
	Damaged,
	Moving,
	Stopped,
	Croisement,
	FeuxRouge
}

// Désir de direction --> donne intention 
enum Intention
{
	TournerGauche,	// 0
	TournerDroite,	// 1
	ToutDroit		// 2
}

// Quatre directions
enum Direction
{
	Nord,	// 0
	Sud,	// 1
	Est,	// 2
	Ouest	// 3
}


var DestAngle : float = -1;
var AngleStep : float = 1;

public var Id : int = 0;

var Speed : float = 50;
var State : VoitureState = VoitureState.Moving;
var StateChanged : float = 0;

var StateIntention : Intention = Intention.ToutDroit;
var Dir : Direction;
var choix : boolean = false; // Le choix de la direction à un croisement a-t-il été fait ?

var MaxSpeed : float = 50;

var call : boolean = true;

// Comportement du conducteur
var MinDistance : float = 1;
var Respect : float = 1;
var Sportsmanship : float = 0;