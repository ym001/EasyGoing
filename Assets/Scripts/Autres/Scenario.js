#pragma strict

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

private var first_crash = true;				// Premier accident dans le tutoriel

public var cout_accident : int;				// Argent déduit en cas d'accident
public var cout_stop : int;
public var cout_feux : int;
public var cout_limitation : int;
public var subvention_journaliere : int;	// Argent donné au joueur chaque jour

function Start()
{
	varGlobal.level = 1;
	varGlobal.msg_id = varGlobal.level*10 + 1;
	
	varGlobal.subvention = subvention_journaliere;
	varGlobal.cout_accident = cout_accident;
	varGlobal.cout_stop = cout_stop;
	varGlobal.cout_feux = cout_feux;
	varGlobal.cout_limitation = cout_limitation;
}

function Update()
{
	if (first_crash && varGlobal.crashes > 0)
	{
		first_crash = false;
		varGlobal.msg_id = 12;
	}
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
		case 10 :
			title = "Objectifs du niveau 1";
			text = goal;
		break;
		
		case 11 :
			title = "Niveau 1";
			
			text = "Bienvenue dans Carcrasher, vous venez d'etre élu maire d'une communauté en proie aux accidents de la route "
			+ "et nous comptons sur vous pour faire de cet endroit un lieu sur où il fait bon vivre.\n\n"
			+ "Pour vous aider à vous adapter à vos nouvelles fonctions de maire, nous vous assisterons et vous donnerons des conseils "
			+ "sur les moyens dont vous disposez pour réguler la circulation.\n\n"
			+ "Pour lancer la simulation, veuillez cliquer sur le bouton Play au centre de l'interface.";
			
			varGlobal.hour = 12.5;
			varGlobal.time_limit = 500;
			
			varGlobal.money_threshold = 500;
			varGlobal.money_start = 5000;
			varGlobal.money = varGlobal.money_start;
			
			varGlobal.crashes = 0;
			varGlobal.crashes_threshold = 150;
			
			varGlobal.deads = 0.3;
			varGlobal.death_threshold = 0.1;
			
			varGlobal.traffic = 0.3;
			varGlobal.traffic_threshold = 0.8;
			
			varGlobal.happiness = 0.3;
			varGlobal.happy_threshold = 0.4;
			
			varGlobal.nb_stop = 0;
			varGlobal.nb_feux = 0;
			varGlobal.nb_lim = 0;
			varGlobal.nb_panneaux_total = 0;
			varGlobal.ecran=0;
			
			goal = "Conditions de victoire :\n\n"
			+ "		- Argent > " + varGlobal.money_threshold + " $\n\n"
			+ "		- Nombre d'accidents < " + varGlobal.crashes_threshold + " voitures\n\n"
			+ "		- Taux de mortalité < " + varGlobal.death_threshold*100 + " %\n\n"
			+ "		- Fluidité > " + varGlobal.traffic_threshold*100 + " %\n\n"
			+ "		- Bonheur > " + varGlobal.happy_threshold*100 + " %";
		break;
		
		case 12 :
			title = "Alerte accident !";
			
			text = "C'est affreux ! Il y a eu un accident dans la ville ! Vous devez absolument intervenir avant que la situation ne "
			+ "s'aggrave. Commencez par arreter la simulation en cliquant sur stop, sélectionnez ensuite un panneau STOP dans "
			+ "l'interface, puis cliquez sur l'intersection pour prévenir de futurs accidents.\n\n"
			+ "Remarque : <<Mettre des informations/statistiques d'accidents causés par l'absence de STOP>>";
			
			varGlobal.ecran=1;
			varGlobal.nb_feux = 0;varGlobal.nb_lim = 0;varGlobal.nb_stop = 0;
		break;
		
		case 13 :
			title = "Un risque à réduire";
			
			text = "Monsieur le maire, malgré vos efforts pour placer des panneaux STOP dans les endroits dangereux, la plupart des gens "
			+ "roulent bien trop vite et menacent la tranquilité de notre ville, nous devons baliser les routes de panneaux de limitation "
			+ "de vitesse afin de réduire les risques.\n\n"
			+ "Pour placer un panneau de limitation de vitesse, il vous suffit de cliquer sur le bouton Vitesses de l'interface et de "
			+ "sélectionner une limite qui vous semble appropriée.\n\n"
			+ "Remarque : <<Mettre des informations/statistiques d'accidents causés par l'absence de panneaux de vitesse>>";
			
			if (GUI.Button(Rect (msg_x+msg_w - 90, msg_y+msg_h - 30, 80, 20), "Valider"))
				varGlobal.msg_id = 0;
			
			varGlobal.ecran=2;
			varGlobal.nb_feux = 0;varGlobal.nb_lim = 0;varGlobal.nb_stop = 0;
				
		break;
		
		case 14 :
			title = "Stop aux attentes inutiles";
			
			text = "Nous avons un autre problème sur les bras Monsieur le maire, les gens se plaignent du temps qu'ils mettent pour "
			+ "traverser les intersections avec panneaux STOP, certains meme n'hésitent pas à les franchir sans s'arreter en ne voyant "
			+ "personne d'autre arriver tandis que d'autres ne parviennent jamais à circuler, n'étant pas prioritaires.\n\n"
			+ "Notre ville évolue et nous devons nous y adapter, en plaçant des feux de circulation, nous régulerons bien mieux le "
			+ "trafic et réduiront le mécontentement de la population.\n\n"
			+ "Remarque : <<Mettre des informations/statistiques sur les feux de circulation>>";
			
			if (GUI.Button(Rect (msg_x+msg_w - 90, msg_y+msg_h - 30, 80, 20), "Valider"))
				varGlobal.msg_id = 0;
				
			varGlobal.ecran=3;
			varGlobal.nb_feux = 0;varGlobal.nb_lim = 0;varGlobal.nb_stop = 0;varGlobal.time_limit=100;
		break;
		
		case 18 :
			title = "Bilan de la situation"; // Positif
			
			text = "Je suis ravi de voir votre capacité à réglementer la circulation, depuis que vous etes aux commandes, la "
			+ "situation de la ville n'a cessé de s'améliorer. On m'a rapporté un total de " + varGlobal.crashes
			+ " accidents ce mois-ci contre " + varGlobal.crashes_threshold + " le mois dernier, mes félicitations Monsieur le maire.";
			
			if (GUI.Button(Rect (msg_x, msg_y+msg_h - 30, 100, 20), "Recommencer"))
			{
				varGlobal.msg_id = varGlobal.level*10 + 1;
				Application.LoadLevel(varGlobal.level);
			}
			
			if (GUI.Button(Rect (msg_x+110, msg_y+msg_h - 30, 100, 20), "Menu principal"))
			{
				varGlobal.level = 0;
				varGlobal.msg_id = 0;
				Application.LoadLevel(varGlobal.level);
			}
			
			if (GUI.Button(Rect (msg_x+210, msg_y+msg_h - 30, 100, 20), "Niveau suivant"))
			{
				varGlobal.level = 2;
				varGlobal.msg_id = varGlobal.level*10 + 1;
				Application.LoadLevel(varGlobal.level);
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
				varGlobal.msg_id = varGlobal.level*10 + 1;
				Application.LoadLevel(1);
			}
			if (GUI.Button(Rect (msg_x+110, msg_y+msg_h - 30, 100, 20), "Menu principal"))
			{
				varGlobal.level = 0;
				varGlobal.msg_id = 0;
				Application.LoadLevel(varGlobal.level);
			}
		break;
		
		case 20 :
			title = "Objectifs du niveau 2";
			text = goal;
		break;
		
		case 21 :
			title = "Niveau 2";
			
			varGlobal.hour = 12.5;
			varGlobal.time_limit = 500;
			
			varGlobal.money_threshold = 500;
			varGlobal.money_start = 5000;
			varGlobal.money = varGlobal.money_start;
			
			varGlobal.crashes = 0;
			varGlobal.crashes_threshold = 150;
			
			varGlobal.deads = 0;
			varGlobal.death_threshold = 0.1;
			
			varGlobal.traffic = 0.3;
			varGlobal.traffic_threshold = 0.7;
			
			varGlobal.happiness = 0.3;
			varGlobal.happy_threshold = 0.5;
			
			varGlobal.nb_stop = 0;
			varGlobal.nb_feux = 0;
			varGlobal.nb_lim = 0;
			varGlobal.nb_panneaux_total = 0;
			
			goal = "Conditions de victoire :\n\n"
			+ "		- Argent > " + varGlobal.money_threshold + " $\n\n"
			+ "		- Nombre d'accidents < " + varGlobal.crashes_threshold + " voitures\n\n"
			+ "		- Taux de mortalité < " + varGlobal.death_threshold*100 + " %\n\n"
			+ "		- Fluidité > " + varGlobal.traffic_threshold*100 + " %\n\n"
			+ "		- Bonheur > " + varGlobal.happy_threshold*100 + " %";
			
			text = "Accomplissez les objectifs suivants dans le temps imparti :\n\n" + goal;
			
			if (GUI.Button(Rect (msg_x+msg_w - 90, msg_y+msg_h - 30, 80, 20), "Valider"))
				varGlobal.msg_id = 0;
		break;
		
		case 28 :
			title = "Bilan de la situation"; // Positif
			
			text = "Je suis ravi de voir votre capacité à réglementer la circulation, depuis que vous etes aux commandes, la "
			+ "situation de la ville n'a cessé de s'améliorer. On m'a rapporté un total de " + varGlobal.crashes
			+ " accidents ce mois-ci contre " + varGlobal.crashes_threshold + " le mois dernier, mes félicitations Monsieur le maire.";
			
			if (GUI.Button(Rect (msg_x, msg_y+msg_h - 30, 100, 20), "Recommencer"))
			{
				varGlobal.msg_id = varGlobal.level*10 + 1;
				Application.LoadLevel(2);
			}
			if (GUI.Button(Rect (msg_x+110, msg_y+msg_h - 30, 100, 20), "Menu principal"))
			{
				varGlobal.level = 0;
				varGlobal.msg_id = 0;
				Application.LoadLevel(varGlobal.level);
			}
			if (GUI.Button(Rect (msg_x+210, msg_y+msg_h - 30, 100, 20), "Niveau suivant"))
			{
				varGlobal.level = 3;
				varGlobal.msg_id = varGlobal.level*10 + 1;
				Application.LoadLevel(varGlobal.level);
			}
			
		break;
		
		case 29 :
			title = "Bilan de la situation"; // Négatif
			
			text = "C'est une catastrophe Monsieur le maire, le nombre d'accidents n'a cessé de croitre ce mois-ci, il y a eu "
			+ "un record de " + varGlobal.crashes + " accidents pour " + varGlobal.crashes_threshold + " accidents le mois "
			+ "dernier. Les rares survivants, voyant la situation se dégrader, ont décidé de quitter la ville tandis que "
			+ "d'autres revendiquent votre démission.";
			
			if (GUI.Button(Rect (msg_x, msg_y+msg_h - 30, 100, 20), "Recommencer"))
			{
				varGlobal.msg_id = varGlobal.level*10 + 1;
				Application.LoadLevel(varGlobal.level);
			}
			if (GUI.Button(Rect (msg_x+110, msg_y+msg_h - 30, 100, 20), "Menu principal"))
			{
				varGlobal.level = 0;
				varGlobal.msg_id = 0;
				Application.LoadLevel(varGlobal.level);
			}
		break;
	}
}