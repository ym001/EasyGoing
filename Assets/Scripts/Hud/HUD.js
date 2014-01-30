#pragma strict

private var HUD_y : int = Screen.height * 4.1/5;	// Position Y de l'interface
private var HUD_h : int = Screen.height - HUD_y;	// Hauteur de l'interface
private var HUD_Panneaux : boolean = true;			// Panneaux d'intersections/vitesses
private var currentHour = varGlobal.hour;			// Heure de la simulation / heure de départ
private var time = 0.0;								// Temps écoulé depuis le début du niveau
private var tab = [""];								// Tableau de noms
private var i : int;								// Itérateur
private var timeMoney = 1;

// Changer le coefficient suivant pour modifier la taille des marges
private var taux_marge = 0.2;
private var marge : int = (Screen.height - HUD_y) * taux_marge;

var boutton1style : GUIStyle;


//=============================================================================================================================
/// Fin du niveau
//=============================================================================================================================
function finish_level()
{

	if ((time*100 - time*100%1) >= varGlobal.time_limit)
	{
		if (varGlobal.money < varGlobal.money_threshold
		|| varGlobal.crashes >= varGlobal.crashes_threshold
		|| varGlobal.deads >= varGlobal.death_threshold
		|| varGlobal.traffic < varGlobal.traffic_threshold
		|| varGlobal.happiness < varGlobal.happy_threshold)
		{
			varGlobal.msg_id = 19;
			varGlobal.stateSim = SimState.Construction;
			GameObject.Find("Terrain").SendMessage("stateSimChange", varGlobal.stateSim, SendMessageOptions.DontRequireReceiver);
		}
		else
		{
			varGlobal.msg_id = 18;
			varGlobal.stateSim = SimState.Construction;
			GameObject.Find("Terrain").SendMessage("stateSimChange", varGlobal.stateSim, SendMessageOptions.DontRequireReceiver);
		}
	}
	else
	{
		time += 0.0001;
		
		if ((time*100 - time*100%1) >= 2*timeMoney)
		{
			varGlobal.money += 50;
			timeMoney++;
		}
	}
}


//tutoriel, changement d'ecran
function finish_level_1()
{
	if(varGlobal.nb_stop >= 2 && varGlobal.ecran==1)
		{varGlobal.msg_id = 13;}
		
	if(varGlobal.nb_lim >= 2 && varGlobal.ecran==2)
		{varGlobal.msg_id = 14;}
		
	if(varGlobal.nb_lim >= 2 && varGlobal.ecran==3)
		{varGlobal.msg_id = 14;}

}


//=============================================================================================================================
/// HUD affichée au cours du mode EDITION
//=============================================================================================================================
function edition_HUD()
{
	// Conditions d'arret de la fonction
	if (varGlobal.msg_id % 10 == 8										// Fenetre de bilan positif
		|| varGlobal.msg_id % 10 == 9									// Fenetre de bilan négatif
		|| varGlobal.msg_id % 10 == 1 && varGlobal.msg_id != 11)		// Fenetre d'introduction aux niveaux (sauf tutoriel)
		return;
	
	if (GUI.Button(Rect (Screen.width/2, HUD_y+HUD_h*1/10, HUD_h, HUD_h*3/10), "Play"))
	{
		currentHour = varGlobal.hour;
		
		if (varGlobal.msg_id == 11)
			varGlobal.msg_id = 0;
		
		varGlobal.crashes = 0;
		
		varGlobal.stateSim = SimState.Simulation;
		GameObject.Find("Terrain").SendMessage("stateSimChange", varGlobal.stateSim, SendMessageOptions.DontRequireReceiver);
	}
	
	// Si on est dans le tutoriel sur la première fenetre de messages
	if (varGlobal.msg_id % 10 == 1 || varGlobal.msg_id % 10 == 0 && varGlobal.msg_id != 0) return;
	
	var size = HUD_h * (1 - taux_marge*2);
	
	if (HUD_Panneaux)
	{
		tab = ["Vitesses", "Aucun", "Stop\n"+varGlobal.cout_stop+" $", "Feux\n"+varGlobal.cout_feux+" $"]; // 1, 2 stop, 3 feux
		
		for (i=0; i<tab.length; i++)
		{
			if (GUI.Button(Rect (marge*(i+1) + size*i, HUD_y + marge, size, size), tab[i]))
			{
				switch (i)
				{
					case 0: // Afficher les panneaux de vitesse
						HUD_Panneaux = false;
						break;
					
					case 1: // Aucun panneau
						varGlobal.choixPanneaux = panneaux.Aucun;
						break;
					
					case 2: // Panneau Stop
						varGlobal.choixPanneaux = panneaux.Stop;
						break;
					
					case 3: // Feux de circulation
						varGlobal.choixPanneaux = panneaux.Feux;
						break;
				}
			}
		}
	}
	else
	{
		tab = ["Panneaux", "Aucun", "30\n" + varGlobal.cout_limitation + " $", "50\n" + varGlobal.cout_limitation + " $",
			"90\n" + varGlobal.cout_limitation + " $", "110\n" + varGlobal.cout_limitation + " $", "130\n" + varGlobal.cout_limitation + " $"];
		
		for (i=0; i<tab.length; i++)
		{
			if (GUI.Button(Rect (marge*(i+1) + size*i, HUD_y + marge, size, size), tab[i]))
			{
				switch (i)
				{
					case 0: // Afficher les panneaux d'intersections
						HUD_Panneaux = true;
						break;
					
					case 1: // Aucun panneau
						varGlobal.choixPanneaux = panneaux.Aucun;
						break;
					
					case 2: // Limitation 30
						varGlobal.choixPanneaux = panneaux.Vitesse;
						varGlobal.choixlimitation = limitation.lim_30;
						break;
					
					case 3: // Limitation 50
						varGlobal.choixPanneaux = panneaux.Vitesse;
						varGlobal.choixlimitation = limitation.lim_50;
						break;
					
					case 4: // Limitation 90
						varGlobal.choixPanneaux = panneaux.Vitesse;
						varGlobal.choixlimitation = limitation.lim_90;
						break;
					
					case 5: // Limitation 110
						varGlobal.choixPanneaux = panneaux.Vitesse;
						varGlobal.choixlimitation = limitation.lim_110;
						break;
					
					case 6: // Limitation 130
						varGlobal.choixPanneaux = panneaux.Vitesse;
						varGlobal.choixlimitation = limitation.lim_130;
						break;
				}
			}
		}
	}
}


//=============================================================================================================================
/// HUD affichée au cours du mode SIMULATION
//=============================================================================================================================
function simulation_HUD()
{
	if (GUI.Button(Rect (Screen.width/2, HUD_y+HUD_h*1/10, HUD_h, HUD_h*3/10), "Stop"))
	{
		time = 0.0;
		varGlobal.money = varGlobal.money_start;
		timeMoney = 1;
		
		if (varGlobal.msg_id == 12)
		{
			varGlobal.crashes = 0;
			varGlobal.msg_id = 0;
		}
		
		varGlobal.stateSim = SimState.Construction;
		GameObject.Find("Terrain").SendMessage("stateSimChange", varGlobal.stateSim, SendMessageOptions.DontRequireReceiver);
	}
	
	// Empecher le joueur de placer des panneaux une fois la simulation lancée
	varGlobal.choixPanneaux = panneaux.Aucun;
	
	tab = ["Mortalité", "Fluidité", "Appréciation"];
	
	var tab_current = [varGlobal.deads, varGlobal.traffic, varGlobal.happiness];
	var tab_total = [varGlobal.death_threshold, varGlobal.traffic_threshold, varGlobal.happy_threshold];
	
	currentHour = (currentHour + 0.001) % 24;
	
	for (i=0; i<tab.length; i++)
	{
		var size = HUD_h * (1 - taux_marge*3);
		
		GUI.Box(Rect (marge/2, HUD_y + marge/2 * (i+1) + (size/2)*i, size*4, size/2), tab[i]);
		
		GUI.Label(Rect (marge/2+200, HUD_y + marge/2 * (i+1) + (size/2)*i, size*4, size), tab_current[i] + " / " + tab_total[i]);
	}
	
	// Fin du niveau quand le temps imparti est écoulé
	finish_level();
	
	if(varGlobal.level == 1)
		finish_level_1();
}



//=============================================================================================================================
/// Objets communs aux modes EDITION et SIMULATION
//=============================================================================================================================
function OnGUI()
{
	// Interface visible
	if (varGlobal.GuiConstructionVisible)
	{
		// Création d'une boite de taille % de l'écran
		GUI.Box(Rect (0, HUD_y, Screen.width, Screen.height - HUD_y), "");
		
		// Bouton d'affichage des objectifs
		if (varGlobal.msg_id % 10 != 1				// Fenetre d'objectifs
			&& varGlobal.msg_id % 10 != 8			// Fenetre de bilan positif
			&& varGlobal.msg_id % 10 != 9			// Fenetre de bilan négatif
			&& varGlobal.msg_id != 12)				// Fenetre de premier accident (tutoriel)
		{
			if (GUI.Button(Rect (Screen.width/2, HUD_y+HUD_h*6/10, HUD_h, HUD_h*3/10), "Objectifs"))
			{
				if (varGlobal.msg_id == 0)		varGlobal.msg_id = varGlobal.level*10;
				else							varGlobal.msg_id = 0;
			}
		}

		
		// Est-ce vraiment nécessaire ? On pourrait plutot en parler dans le tutoriel
		GUI.Label(Rect (Screen.width*3/5 + 40, HUD_y + 10, 150, 20), "f1 = vue du dessus");
		GUI.Label(Rect (Screen.width*3/5 + 40, HUD_y + 30, 150, 20), "f2 = vue libre");
		
		// Mode édition/simulation
		if (varGlobal.stateSim == SimState.Construction)		edition_HUD();
		else													simulation_HUD();
		
		var marg = 5;
		var espace = HUD_h - marg*4;
		
		for (i=0; i<3; i++)
		{
			var text = "";
			
			if (i == 0)
				text = "Argent : " + varGlobal.money + " $";
			
			if (varGlobal.stateSim == SimState.Simulation)
			{
				if (i == 1)
				{
					text = "Accidents : " + varGlobal.crashes + " voiture";
					
					if (varGlobal.crashes > 0)
						text += "s";
				}
				
				if (i == 2)
				{
					var zero = "";
					if (((currentHour%1)*60) < 10) zero = "0";
						text = "Heure : " + (currentHour - currentHour%1) + " h " + zero + (((currentHour%1)*60) - ((currentHour%1)*60)%1);
				}
			}
			
			GUI.Label(Rect (Screen.width*1.5/5, HUD_y + marg*(i+1) + espace*i/3, 150, 20), text);
		}
	}
}