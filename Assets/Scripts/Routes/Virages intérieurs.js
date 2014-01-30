#pragma strict

function OnTriggerEnter(other : Collider)
{
	var voiture = other.transform.parent.gameObject;
	var properties = voiture.GetComponent(VoitureProperties);
	
	var diff = voiture.transform.eulerAngles.y - properties.DestAngle;
	if (Mathf.Abs(diff > 180 ? diff - 360 : diff) > 45)
		return;

	voiture.transform.eulerAngles.y = properties.DestAngle;
	
	properties.DestAngle = (transform.eulerAngles.y + 270) % 360;
	properties.AngleStep = 1.15;
	
	if(Mathf.Round(properties.DestAngle)==90)
		properties.Dir = Direction.Est;
			
	if(Mathf.Round(properties.DestAngle)==180)
		properties.Dir = Direction.Sud;
			
	if(Mathf.Round(properties.DestAngle)==270)
		properties.Dir = Direction.Ouest;
			
	if(Mathf.Round(properties.DestAngle)==0)
		properties.Dir = Direction.Nord;
}