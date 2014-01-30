#pragma strict

function OnTriggerEnter(other : Collider)
{
	if (!other.transform.parent)
		return;

	var voiture1 = this.transform.parent.gameObject;
	var voiture2 = other.transform.parent.gameObject;
	
	var properties1 = voiture1.GetComponent(VoitureProperties);
	var properties2 = voiture2.GetComponent(VoitureProperties);
	
	if (voiture1 == voiture2 || !properties1 || !properties2)
		return;
	
	properties1.State = VoitureState.Damaged;
	properties1.StateChanged = Time.timeSinceLevelLoad;
	properties2.State = VoitureState.Damaged;
	properties2.StateChanged = Time.timeSinceLevelLoad;
}