#pragma strict

function Start () {

}

function Update () {

}


function OnTriggerEnter(collision : Collider)
{
	if(collision.transform.parent.tag == "Voiture")
		collision.collider.transform.parent.GetComponent(VoitureProperties).State = VoitureState.Stopped;
}

function OnTriggerExit(collision : Collider)
{
	if(collision.transform.parent.tag == "Voiture")
		collision.collider.transform.parent.GetComponent(VoitureProperties).State = VoitureState.Moving;
}