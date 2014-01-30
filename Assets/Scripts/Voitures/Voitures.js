#pragma strict

var direction = 2;
static var id_voiture : int = 0;

// Récupère les voitures perçues
function perceptionVoiture(centre : Vector3, rayon : float, distance : float, properties : VoitureProperties ) : RaycastHit[]
{
	var layer11 : int = 11;
	var layermask : int = 1 << layer11;
		
	var finalmask : int = layermask;
	var castDirection;
	
	var hit : RaycastHit[];
	
	if (properties.Dir == Direction.Nord)	castDirection = transform.forward;
	if (properties.Dir == Direction.Sud)	castDirection = -transform.forward;
	if (properties.Dir == Direction.Est)	castDirection = transform.right;
	if (properties.Dir == Direction.Ouest)	castDirection = -transform.right;			
	
	hit = Physics.SphereCastAll (centre, rayon, castDirection, distance,finalmask);
	return hit;
}

// Récupère les signalisations feux rouges
function perceptionSingalisationFeuxRouge(centre : Vector3, rayon : float, distance : float, properties : VoitureProperties, h : RaycastHit) : boolean
{
	var layer12 : int = 12;
	var layermask : int = 1 << layer12;
		
	var finalmask : int =  layermask;
	var castDirection;
	
	if (properties.Dir == Direction.Nord)	castDirection = transform.forward;
	if (properties.Dir == Direction.Sud)	castDirection = -transform.forward;
	if (properties.Dir == Direction.Est)	castDirection = transform.right;
	if (properties.Dir == Direction.Ouest)	castDirection = -transform.right;			
	
	if (Physics.SphereCast(centre, rayon, castDirection,h, distance,finalmask))
	{
		return true;
	}
	else return false;
}

// Récupère l'intersection et renvoie vrai s'il y en a une
function perceptionIntersection(centre : Vector3, rayon : float, distance : float, properties : VoitureProperties, h : RaycastHit ) : boolean
{
	var layer10 : int = 10;
	var layermask1 : int = 1 << layer10;
	var finalmask : int = layermask1;
	
	var castDirection;
	
	if (properties.Dir == Direction.Nord)	castDirection = transform.forward;
	if (properties.Dir == Direction.Sud)	castDirection = -transform.forward;
	if (properties.Dir == Direction.Est)	castDirection = transform.right;
	if (properties.Dir == Direction.Ouest)	castDirection = -transform.right;			
	
	if (Physics.SphereCast(centre, rayon, castDirection, h, distance, finalmask))
	{
		return true;
	}
	else return false;
}

// Mise à jour des intentions + J'ai l'intension de tourner ... ou pas (choix aléatoire)
function Desir(hits : RaycastHit[], properties : VoitureProperties)
{
	var dir : int = Time.frameCount%3;
	
	if (dir == 0)		properties.StateIntention = Intention.TournerGauche;
	if (dir == 1)		properties.StateIntention = Intention.TournerDroite;
	if (dir == 2)		properties.StateIntention = Intention.ToutDroit;

	properties.choix =true;
}

// Machine à états finis
function Update()
{
	var voitures = GameObject.FindGameObjectsWithTag("Voiture");//recupere toute les voiture
	
	for (var voiture in voitures)
	{
		// Récupération des propriétés de la voiture
		var properties = voiture.GetComponent(VoitureProperties);
		
		if (properties.State == VoitureState.Damaged)
		{
			if (Time.timeSinceLevelLoad > properties.StateChanged + 10)
			{varGlobal.crashes++;print("damaged");varGlobal.money -=varGlobal.cout_accident;Destroy(voiture);}
			continue;
		}
																																								
		switch(properties.State)
		{
			case VoitureState.Stopped :
				stop(properties,voiture);
			break;
			
			case VoitureState.Moving :
				move(properties,voiture);
			break;
		
			case VoitureState.Damaged :
				damage(properties,voiture);
			break;
			
			case VoitureState.Croisement :
				croisement(properties,voiture);
			break;
		}																																																						
	}
}


function wait_Signalisation_Stop(delay : int,properties : VoitureProperties, voiture : GameObject)
{
	yield WaitForSeconds (delay);
	properties.call=true;
	
	// Perception des voitures
	var cpt : int = 0;
	var hit_Voiture: RaycastHit[];
	hit_Voiture =perceptionVoiture(voiture.transform.position  ,30,10,properties);
	
	for (var i : int =0;i<hit_Voiture.Length;i++)
	{
		if (hit_Voiture[i].collider.transform.parent.GetComponent(VoitureProperties).Id != properties.Id)
		{ 
			if (hit_Voiture[i].collider.transform.parent.GetComponent(VoitureProperties).State ==  VoitureState.Moving )
				cpt++;
		}	
	}
		
	if (cpt<1)
	{
		changeState( VoitureState.Moving,properties,voiture);
	}
}


function wait_priorite(delay : int,properties : VoitureProperties, voiture : GameObject)
{	
	//perception voitures
	var cpt_voiture : int = 0;
	var hit_Voiture: RaycastHit[];
	hit_Voiture =perceptionVoiture(voiture.transform.position ,30,20,properties);

	if (hit_Voiture.Length>1)
	{
		for (var i : int =0;i<hit_Voiture.Length;i++) // Pour chaque voiture trouvée
		{
			if (hit_Voiture[i].collider.transform.parent.GetComponent(VoitureProperties).Id != properties.Id) // Si c'est pas moi 
			{ 
				if (hit_Voiture[i].collider.transform.parent.GetComponent(VoitureProperties).State ==  VoitureState.Moving ) // Si elle roule
				{
					var obj= hit_Voiture[i].collider.transform.parent.gameObject.GetComponent(VoitureProperties);	// On regarde la direction 	
					if (properties.Dir == Direction.Nord && properties.StateIntention != Intention.TournerDroite )
					{
						if (obj.Dir == Direction.Ouest)
							cpt_voiture++;
					}
					else if (properties.Dir ==Direction.Sud && properties.StateIntention != Intention.TournerDroite)
					{
						if (obj.Dir == Direction.Est)
							cpt_voiture++;
					}	
					else if (properties.Dir == Direction.Est && properties.StateIntention != Intention.TournerDroite)
					{
						if (obj.Dir == Direction.Nord)
							cpt_voiture++;
					}	
					else if (properties.Dir == Direction.Ouest && properties.StateIntention != Intention.TournerDroite)
					{
						if (obj.Dir == Direction.Sud)
							cpt_voiture++;
					}
				}
			}	
		}
		if (cpt_voiture<1)
		{
			changeState( VoitureState.Moving,properties,voiture);
		}
		else
		{	
			properties.Speed = 0;
			yield WaitForSeconds (delay);
			properties.call=true;
		}
	}
	else
	{
		changeState( VoitureState.Moving,properties,voiture);
	}
}

// Etat arreter 
function stop(properties : VoitureProperties, voiture : GameObject )
{
	properties.Speed = 0;
	if (properties.call == true)
	{
	 	 wait_Signalisation_Stop(2 * properties.Respect, properties,voiture);
		 properties.call=false;
	}
}

// Etat croisement = priorité à droite 
function croisement( properties : VoitureProperties, voiture : GameObject)
{
	if (properties.call == true)
	{
	 	 wait_priorite(0.5,properties,voiture);
		 properties.call=false;
	}
}

function feuxRouge(properties : VoitureProperties, voiture : GameObject)
{
	var hit : RaycastHit;
	var test : boolean = perceptionSingalisationFeuxRouge(voiture.transform.position ,20,10,properties,hit);
	
	if (test)
	{
		var propertiesRL : propertieRedLight;
		propertiesRL = hit.collider.transform.parent.GetComponent(propertieRedLight);
		
		if (propertiesRL.etat == red_light_color.orange)
		{
			//ici choix si on passe le orange ou pas ( dépendra des var du conducteur )
			
			changeState( VoitureState.Moving,properties,voiture);
		}
		if (propertiesRL.etat == red_light_color.green)
		{
			changeState( VoitureState.Moving,properties,voiture);
		}
		if (propertiesRL.etat == red_light_color.red)
		{
			properties.Speed = 0;
		}
	}
}

//Etat en mouvement
function move(properties : VoitureProperties, voiture : GameObject)
{
	// Si etat non changé, on roule
	// Vérification de l'environnement

	var def = true;

	var orientation = new Vector3(Mathf.Sin(voiture.transform.eulerAngles.y / 180 * Mathf.PI), 0, Mathf.Cos(voiture.transform.eulerAngles.y / 180 * Mathf.PI));
	var position = new Vector3(voiture.transform.position.x, voiture.transform.position.y + 2, voiture.transform.position.z) + orientation;
	var horizontal = Input.GetAxis("Horizontal");
	var speed = properties.Speed / 50;
	var minDistance = 4 + (Mathf.Pow(properties.Speed / 10, 2) * 2.587 + 6) * properties.MinDistance;
	
	
	// Réflexe anti-collision
	var hit : RaycastHit;
	var layermask : int = 1 << 11;
	
	if (Physics.SphereCast(position, 3, orientation, hit, minDistance, layermask))
	{
		def = false;
		
		var object = hit.collider.transform.parent.gameObject;
		switch (object.tag)
		{
			case "Voiture":
				if (hit.distance < 0.05)
					properties.Speed = 0;
				else if (hit.distance < minDistance)
					properties.Speed -= minDistance / hit.distance * 2;
				else
					def = true;
					
				properties.Speed = Mathf.Max(properties.Speed, 0);
				break;
				
			default:
				def = true;
				break;
		}
	}
	
	layermask = 1 << 12;
	
	if (Physics.Raycast(position, orientation, hit, minDistance, layermask))
	{
		def = false;
		
		object = hit.collider.transform.parent.gameObject;
		switch (object.tag)
		{
			case "Stop":
				properties.Speed = Mathf.Lerp(properties.MaxSpeed, 0, Mathf.Pow(1 - hit.distance / 100, 1.5 - properties.Sportsmanship) - 0.1);
				properties.Speed = Mathf.Max(properties.Speed, 0);		
			break;
					
			case "Feux":			
				var prop = hit.collider.transform.parent.GetComponent(propertieRedLight);
				
				//var minSpeed;
				//if (prop.etat == red_light_color.red || (prop.etat == red_light_color.orange && properties.Respect < 0.3))
				//	minSpeed = 0;
				//if (prop.etat == red_light_color.orange)
				//	minSpeed = properties.MaxSpeed * Mathf.Sqrt(1 - properties.Respect);
				
				if (prop.etat == red_light_color.red || (prop.etat == red_light_color.orange && properties.Respect > 0.6 && (hit.distance > 10 || properties.Speed < 20)))
				{
					properties.Speed = Mathf.Lerp(properties.MaxSpeed, 0, Mathf.Pow(1 - hit.distance / 100, 1.5 - properties.Sportsmanship) - 0.1);
					properties.Speed = Mathf.Max(properties.Speed, 0);
				}
			break;
			
			default:
				def = true;
			break;
		}
	}
		
	// Bouger le véhicule
	//if (def)
	//{
		if (properties.Speed < properties.MaxSpeed)
			properties.Speed = Mathf.Min(properties.Speed + properties.Sportsmanship, properties.MaxSpeed);
		else if (properties.Speed > properties.MaxSpeed)
			properties.Speed = Mathf.Max(properties.Speed - properties.Sportsmanship, properties.MaxSpeed);
	//}
	
	// Orientation
	//voiture.transform.eulerAngles.y += horizontal * direction;
	if (properties.AngleStep != 0 && Mathf.Abs(voiture.transform.eulerAngles.y - properties.DestAngle) > 4)
	    voiture.transform.eulerAngles.y += properties.AngleStep / 30 * properties.Speed;
	else
	{
	    voiture.transform.eulerAngles.y = properties.DestAngle;
	    properties.AngleStep = 0;
        properties.State = VoitureState.Moving;
        properties.StateIntention = Intention.ToutDroit;
	}

	// Alignement automatique
	var angle = Mathf.Round(voiture.transform.eulerAngles.y / 90);
	if (properties.AngleStep == 0)
	{
		 voiture.transform.eulerAngles.y = Mathf.Lerp(voiture.transform.eulerAngles.y, angle * 90, 0.1);
		  		
		if (Mathf.Abs(voiture.transform.eulerAngles.y - angle * 90) <= 5)
		{
			var x = Mathf.Round((voiture.transform.position.x - 5) / 10) * 10 + 5;
			var z = Mathf.Round((voiture.transform.position.z - 5) / 10) * 10 + 5;
					
			if (angle % 2 == 0 && Mathf.Abs(x - voiture.transform.position.x) >= 0.5)
				voiture.transform.eulerAngles.y += (x - voiture.transform.position.x > 0 ? 1 : -1) * (angle % 4 == 0 ? 1 : -1) * 2;
			if (angle % 2 == 1 && Mathf.Abs(z - voiture.transform.position.z) >= 0.5)
				voiture.transform.eulerAngles.y += (z - voiture.transform.position.z > 0 ? 1 : -1) * (angle % 4 == 1 ? -1 : 1) * 2;
		}
	}
	
	// Déplacement
	voiture.transform.position.z += Mathf.Cos(voiture.transform.eulerAngles.y / 180 * Mathf.PI) * speed;
	voiture.transform.position.x += Mathf.Sin(voiture.transform.eulerAngles.y / 180 * Mathf.PI) * speed;		
}

// Etat endommagé
function damage(properties : VoitureProperties, voiture : GameObject)
{
	changeState(VoitureState.Moving, properties, voiture);
}


//regle de changement d'état
function changeState(state : VoitureState, properties : VoitureProperties, voiture : GameObject)
{
	switch(state)
	{
		case VoitureState.Stopped:
			properties.State = VoitureState.Stopped;
		break;
		
		case VoitureState.Moving :
			properties.State = VoitureState.Moving;
		break;
		
		case VoitureState.Damaged :
			properties.State = VoitureState.Damaged;
		break;
		
		case VoitureState.Croisement :
			properties.State = VoitureState.Croisement;
			properties.call = true;
		break;
		
		case VoitureState.FeuxRouge:
			properties.State = VoitureState.FeuxRouge;
		
		break;
	
	}
}
