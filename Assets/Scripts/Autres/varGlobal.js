#pragma strict

// Enumeration des états de la caméra
public enum CameraView
{
	CameraHaut,		// Touche F1
	CameraPersp		// Touche F2
}

// Enumeration des états du jeu
public enum GameState
{
	Start,		// début du jeu (démo)
	Game,		// jeu
	Pause,		// pause
	End,		// fin du jeu
	Switch		// changement de niveau
}

// Limitations de vitesses placables 
public enum limitation
{
	lim_30,		// 0
	lim_50,		// 1
	lim_90,		// 2
	lim_110,	// 3
	lim_130,	// 4
	Suppr,		// 5 : suppression du panneau
	Aucun		// 6
}

// Panneaux placables
public enum panneaux
{
	Stop,		// 0
	Feux,		// 1
	Vitesse,	// 2
	Suppr,		// 3 : suppression du panneau
	Aucun		// 4
}

// Enumeration des états de la simulation (construction/simulation)
public enum SimState
{
	Simulation,		// Début du jeu (démo)
	Construction	// Jeu
}


//=============================================================================================================================
// Gestion de la caméra
//=============================================================================================================================
public static var camState : CameraView = CameraView.CameraHaut;	// Etat actuel de la caméra
public static var camEtat : boolean = true;							// Variable static pour qu'un autre script y accède facilement
public static var camSpeed : float = 15;							// Vitesse de la caméra


//=============================================================================================================================
// Interface du jeu
//=============================================================================================================================
public static var GuiConstructionVisible : boolean = true;		// Affichage/masquage de l'HUD et du bouton menu
public static var msg_id = 11;									// ID de la fenetre de messages


//=============================================================================================================================
// Données du jeu (affichées sur l'interface) et seuils des missions
//=============================================================================================================================
public static var hour = 0.0;					// Heure affichée au cours de la simulation
public static var time_limit = 0;				// Durée du niveau avant victoire/échec

public static var money = 0;					// Argent
public static var money_threshold = 0;			// Seuil d'argent
public static var money_start = 0;				// Argent de départ

public static var crashes = 0;					// Nombre d'accidents
public static var crashes_threshold = 0;		// Seuil d'accidents

public static var deads = 0.0;					// Taux de mortalité
public static var death_threshold = 0.0;		// Seuil de mortalité (%)

public static var traffic = 0.0;				// Taux de fluidité
public static var traffic_threshold = 0.0;		// Seuil de fluidité (%)

public static var happiness = 0.0;				// Taux de bonheur
public static var happy_threshold = 0.0;		// Seuil de bonheur (%)


//=============================================================================================================================
// Gestion des états du jeu
//=============================================================================================================================
public static var state : GameState;		// Etat actuel de la machine
public static var stateSim : SimState;
public static var nextLevel : String;		// Nom du prochain niveau


//=============================================================================================================================
// Placement des panneaux
//=============================================================================================================================
public static var choixPanneaux : panneaux = panneaux.Aucun;			// Panneau selectionné
public static var choixlimitation : limitation = limitation.Aucun;		// Vitesse du paneau de limitation de vitesse selectionné
public static var directionPanneaux : int = 0;							// Direction du panneau
public static var nb_stop = 0;
public static var nb_feux = 0;
public static var nb_lim = 0;
public static var nb_panneaux_total = 0;
public static var subvention : int;
public static var cout_accident : int;
public static var cout_stop : int;
public static var cout_feux : int;
public static var cout_limitation : int;

public static var level = 0;


//var speciale pour scenario 1
static public var ecran : int;


function Start()
{
	camState = CameraView.CameraHaut;
	camEtat = true;
	camSpeed = 15;
	
	GuiConstructionVisible = true;
	
	choixPanneaux = panneaux.Aucun;
	choixlimitation = limitation.Aucun;
	directionPanneaux = 0;
	ecran = 0;
}
