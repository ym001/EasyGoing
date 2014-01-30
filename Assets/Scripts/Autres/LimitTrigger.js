#pragma strict

function OnTriggerEnter(other : Collider)
{
	var voiture = other.transform.parent.gameObject;
	Destroy(voiture);
}