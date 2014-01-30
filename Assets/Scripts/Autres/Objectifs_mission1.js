#pragma strict

/*
// Position X et Y de la fenetre de messages
private var msg_x = Screen.width*1/5;
private var msg_y = Screen.height*1/5;

// Taille W et H de la fenetre de messages
private var msg_w = Screen.width - msg_x*2;
private var msg_h = Screen.height - msg_y*2;

// Textes de la fenetre
private var marge = 20;		// Marge entre les bords de la fenetre et les textes
private var title = "";		// Titre de la fenetre
private var text = "";		// Texte de la fenetre
private var goal = "";		// Objectifs du niveau


public var cout_accident : int; //argent déduit en cas d'accident
public var cout_stop : int;
public var cout_feux : int;
public var cout_limitation : int;
public var subvention_journaliere : int; //argent donnée au joueur chaque jour


function Start () 
{
	varGlobal.hour = 12.5;
	varGlobal.time_limit = 1000;
			
	varGlobal.money = 5000;
	varGlobal.money_threshold = 500;
			
	varGlobal.crashes = 0;
	varGlobal.crashes_threshold = 150;
			
	varGlobal.deads = 0;
	varGlobal.death_threshold = 0.3;
			
	varGlobal.traffic = 0.3;
	varGlobal.traffic_threshold = 0.8;
			
	varGlobal.happiness = 0.3;
	varGlobal.happy_threshold = 0.4;
			
	varGlobal.nb_stop=0;
	varGlobal.nb_feux =0;
	varGlobal.nb_lim =0;
	varGlobal.nb_panneaux_total=0;
	
	varGlobal.msg_id = 10;
	varGlobal.subvention = subvention_journaliere;
	varGlobal.cout_accident=cout_accident;
	varGlobal.cout_stop=cout_stop;
	varGlobal.cout_feux=cout_feux;
	varGlobal.cout_limitation=cout_limitation;
	
	
}


function OnGUI()
{
	if (varGlobal.msg_id > 0)
	{
		GUI.Box(Rect (msg_x, msg_y, Screen.width*3/5, Screen.height*3/5), title);
		GUI.Label(Rect (msg_x+marge, msg_y+marge*2, msg_w-marge*2, msg_h-marge*3), text);
	}
	
	switch (varGlobal.msg_id)
	{
		case 0 :
		break;
		
		case 10 :
			title = "Niveau 2";
			
			text = "Accomplissez les objectifs suivant dans le temps imparti:\n\n"
			+"\n"
			+"\n"
			+"\n";
			
			if (GUI.Button(Rect (msg_x+msg_w - 90, msg_y+msg_h - 30, 80, 20), "Valider"))
			{
				varGlobal.msg_id = 0;
			}
			
		break;
		
		case 18 :
			title = "Bilan de la situation"; // Positif
			
			text = "Je suis ravi de voir votre capacité à réglementer la circulation, depuis que vous etes aux commandes, la "
			+ "situation de la ville n'a cessé de s'améliorer. On m'a rapporté un total de " + varGlobal.crashes
			+ " accidents ce mois-ci contre " + varGlobal.crashes_threshold + " le mois dernier, mes félicitations Monsieur le maire.";
			
			if (GUI.Button(Rect (msg_x, msg_y+msg_h - 30, 100, 20), "Recommencer"))
			{
				varGlobal.msg_id = 10;
				Application.LoadLevel(2);
			}
			if (GUI.Button(Rect (msg_x+110, msg_y+msg_h - 30, 100, 20), "Menu principal"))
			{
				varGlobal.msg_id = 0;
				Application.LoadLevel(0);
			}
			if (GUI.Button(Rect (msg_x+210, msg_y+msg_h - 30, 100, 20), "Niveau suivant"))
			{
				varGlobal.msg_id = 0;
				Application.LoadLevel(3);
			}
			
		break;
		
		case 19 :
			title = "Bilan de la situation"; // Négatif
			
			text = "C'est une catastrophe Monsieur le maire, le nombre d'accidents n'a cessé de croitre ce mois-ci, il y a eu "
			+ "un record de " + varGlobal.crashes + " accidents pour " + varGlobal.crashes_threshold + " accidents le mois "
			+ "dernier. Les rares survivants, voyant la situation se dégrader, ont décidé de quitter la ville tandis que "
			+ "d'autres revendiquent votre démission.";
			
			if (GUI.Button(Rect (msg_x, msg_y+msg_h - 30, 100, 20), "Recommencer"))
			{
				varGlobal.msg_id = 10;
				Application.LoadLevel(2);
			}
			if (GUI.Button(Rect (msg_x+110, msg_y+msg_h - 30, 100, 20), "Menu principal"))
			{
				varGlobal.msg_id = 0;
				Application.LoadLevel(0);
			}
		break;
	}
	
}*/