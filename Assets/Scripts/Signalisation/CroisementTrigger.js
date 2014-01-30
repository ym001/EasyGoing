#pragma strict

function OnTriggerEnter(collision : Collider)
{
	if(collision.transform.parent.tag == "Voiture")
		collision.collider.transform.parent.GetComponent(VoitureProperties).State = VoitureState.Croisement;
}

function OnTriggerExit(collision : Collider)
{
	if(collision.transform.parent.tag == "Voiture")
		collision.collider.transform.parent.GetComponent(VoitureProperties).State = VoitureState.Moving;
}