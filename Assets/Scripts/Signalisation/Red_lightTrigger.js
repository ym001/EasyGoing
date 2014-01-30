#pragma strict

function Start () {

}

function Update () {

}


function OnTriggerEnter(collision : Collider)
{
	if (collision.transform.parent.tag != "Voiture")
		return;
		
	var trafficLight = transform.parent.GetComponent(propertieRedLight);
	var car = collision.transform.parent.GetComponent(VoitureProperties);

	if (trafficLight.etat == red_light_color.red)
		car.State = VoitureState.FeuxRouge;
	else if (trafficLight.etat == red_light_color.orange && car.Speed < 10)
		car.State = VoitureState.FeuxRouge;
	else
		car.State = VoitureState.Moving;
}

function OnTriggerExit(collision : Collider)
{
	if(collision.transform.parent.tag == "Voiture")
		collision.collider.transform.parent.GetComponent(VoitureProperties).State = VoitureState.Moving;
}

function OnTriggerStay(collision : Collider)
{
	if(collision.transform.parent.tag == "Voiture" && transform.parent.GetComponent(propertieRedLight).etat == red_light_color.green )
		collision.collider.transform.parent.GetComponent(VoitureProperties).State = VoitureState.Moving;
}