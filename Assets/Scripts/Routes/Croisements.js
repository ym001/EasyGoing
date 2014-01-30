#pragma strict

function OnTriggerEnter(other : Collider)
{
	var voiture = other.transform.parent.gameObject;
	var properties = voiture.GetComponent(VoitureProperties);
	
	properties.State = VoitureState.Croisement;

	var diff = voiture.transform.eulerAngles.y - properties.DestAngle;
	if (Mathf.Abs(diff > 180 ? diff - 360 : diff) > 45)
		return;
		
	voiture.transform.eulerAngles.y = properties.DestAngle;
	
	switch (Mathf.Round(Random.Range(1, 6)))
	{
		case 1: // Left
			properties.DestAngle = (properties.DestAngle + 360 - 90) % 360;
			properties.AngleStep = -1.35;
			properties.StateIntention = Intention.TournerGauche;
		break;
					
		case 2: // Right
			properties.DestAngle = (properties.DestAngle + 90) % 360;
			properties.AngleStep = 2.1;
			properties.StateIntention = Intention.TournerDroite;	
		break;
		
		default: // Nothing
			properties.StateIntention = Intention.ToutDroit;
		break;
	}
	
	
	if(properties.AngleStep ==0){
		if(properties.DestAngle==90)
			properties.Dir = Direction.Est;
				
		if(properties.DestAngle==180)
			properties.Dir = Direction.Sud;
				
		if(properties.DestAngle==270)
			properties.Dir = Direction.Ouest;
				
		if(properties.DestAngle==0)
			properties.Dir = Direction.Nord;
	}
		
		
}

function OnTriggerExit(other : Collider)
{
	var voiture = other.transform.parent.gameObject;
	var properties = voiture.GetComponent(VoitureProperties);
	
	properties.call = true;
}