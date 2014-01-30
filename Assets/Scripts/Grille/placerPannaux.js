#pragma strict


private var myCamera : Camera; 
private var global : varGlobal; 

// Caméra disponible
public var CamH :Camera; // Caméra toit
public var CamP :Camera; // Caméra perspective

// Objets utilisables
public var PanStop : GameObject;
public var Feux : GameObject;
public var PanLim30 : GameObject;
public var PanLim50 : GameObject;
public var PanLim90 : GameObject;
public var PanLim110 : GameObject;
public var PanLim130 : GameObject;



function Update () 
{
	// Mise à jour du choix de la caméra pour avoir le bon point de vue
	if (varGlobal.camState == CameraView.CameraHaut)
	{
		myCamera = CamH;
	}
	else
	{
		myCamera = CamP;
	}
	
	
	var hit : RaycastHit;
	var ray : Ray = myCamera.ScreenPointToRay(Input.mousePosition); // Point de départ du rayon

	if (Input.GetButtonDown ("Fire2")) // Clic droit --> on tourne le panneau
	{
		global.directionPanneaux = (global.directionPanneaux + 90 )%360; // On tourne le panneau de 90°
	}
	
	// Placement des panneaux 
	if (Physics.Raycast(ray,hit) && Input.GetButtonUp("Fire1"))  // Lancer de rayon pour savoir sur quelle case on est (lancer depuis le pointeur souris lors du clic gauche)
	{
		
		switch (hit.transform.tag)
		{
			// Placement objet sur un trottoir
			case "trottoir" :
				
				switch (varGlobal.choixPanneaux) // Objet choisi
				{
					case panneaux.Stop :
					
						var pan : GameObject;
						pan = Instantiate(PanStop,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0)); // Création + placement des panneaux stop
						varGlobal.nb_stop = varGlobal.nb_stop + 1;
						varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
						varGlobal.money -=varGlobal.cout_stop;
						
						if (global.directionPanneaux==0)	pan.GetComponent(propertieSignalisation).direction = Direction.Nord ;
						if (global.directionPanneaux==90)	pan.GetComponent(propertieSignalisation).direction = Direction.Est;
						if (global.directionPanneaux==180)	pan.GetComponent(propertieSignalisation).direction = Direction.Sud;
						if (global.directionPanneaux==270)	pan.GetComponent(propertieSignalisation).direction = Direction.Ouest;
						
					break;
					
					case panneaux.Feux :
					
						hit.transform.position.y=3.5;
						Instantiate(Feux,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0));
						varGlobal.nb_feux = varGlobal.nb_feux + 1;
						varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
						varGlobal.money -=varGlobal.cout_feux;
					
					break;
					
					case panneaux.Vitesse :
					
						switch(varGlobal.choixlimitation)
						{
							case limitation.lim_30:
								Instantiate(PanLim30,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0));
								varGlobal.nb_lim = varGlobal.nb_lim + 1;
								varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
								varGlobal.money -=varGlobal.cout_limitation;
							break;
							
							case limitation.lim_50:
								Instantiate(PanLim50,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0));
								varGlobal.nb_lim = varGlobal.nb_lim + 1;
								varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
								varGlobal.money -=varGlobal.cout_limitation;
							break;
							
							case limitation.lim_90:
								Instantiate(PanLim90,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0));
								varGlobal.nb_lim = varGlobal.nb_lim + 1;
								varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
								varGlobal.money -=varGlobal.cout_limitation;
							break;
							
							case limitation.lim_110:
								Instantiate(PanLim110,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0));
								varGlobal.nb_lim = varGlobal.nb_lim + 1;
								varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
								varGlobal.money -=varGlobal.cout_limitation;
							break;
							
							case limitation.lim_130:
								Instantiate(PanLim130,hit.transform.position,Quaternion.Euler(0,global.directionPanneaux,0));
								varGlobal.nb_lim = varGlobal.nb_lim + 1;
								varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total + 1;
								varGlobal.money -=varGlobal.cout_limitation;
							break;
						}
					
					break;
					
					case panneaux.Aucun :
						print("Pas de panneaux selectionné");
					break;
				}
			break;
			
			case "route" :
			break;
			
			case "croisement" :
			break;
			
		}
			
		switch(hit.transform.name)
		{
			
			// Suppresion de l'objet 30
			case "Limitation 30(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_lim = varGlobal.nb_lim - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_limitation;
			break;
			
			// Suppresion de l'objet 50
			case "Limitation 50(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_lim = varGlobal.nb_lim - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_limitation;
			break;
			
			// Suppresion de l'objet 90
			case "Limitation 90(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_lim = varGlobal.nb_lim - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_limitation;
			break;
			
			// Suppresion de l'objet 110
			case "Limitation 110(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_lim = varGlobal.nb_lim - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_limitation;
			break;
			
			// Suppresion de l'objet 130
			case "Limitation 130(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_lim = varGlobal.nb_lim - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_limitation;
			break;
			
			// Suppresion de l'objet stop
			case "Stop(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_stop = varGlobal.nb_stop - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_stop;
			break;
			
			// Suppresion de l'objet feux rouge
			case "Red_light(Clone)" :
				Destroy(hit.transform.gameObject);
				varGlobal.nb_feux = varGlobal.nb_feux - 1;
				varGlobal.nb_panneaux_total = varGlobal.nb_panneaux_total - 1;
				varGlobal.money +=varGlobal.cout_feux;
			break;
		}
	}
}