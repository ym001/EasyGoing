#pragma strict

private var Speed : float = 30;

function OnTriggerEnter(other : Collider)
{
	var voiture = other.transform.parent.gameObject;
	var properties = voiture.GetComponent(VoitureProperties);
	properties.MaxSpeed = Speed;
}



