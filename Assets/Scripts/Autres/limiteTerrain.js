#pragma strict


function OnTriggerEnter(collision : Collider)
{
	Destroy(collision.transform.parent.gameObject);
}