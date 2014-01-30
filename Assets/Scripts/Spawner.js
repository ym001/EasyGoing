#pragma strict

var MinDelay : float = 2;
var MaxDelay : float = 3;
var MinSpeed : float = 50;
var MaxSpeed : float = 50;
var Voiture : Transform;
var Angle : float;

var Id : int = 0;
var NextSpawn : float = 0;

function Update()
{	
	var orientation = new Vector3(0, -1, 0);
	var position = new Vector3(transform.position.x, transform.position.y + 10, transform.position.z);

	if (Time.timeSinceLevelLoad > NextSpawn)
	{
		NextSpawn = Time.timeSinceLevelLoad + Random.Range(MinDelay, MaxDelay);
	
		var hit : RaycastHit;
		if (Physics.SphereCast(position, 5, orientation, hit, 10, 1 << 11))
			return;
	
		var clone = Instantiate(Voiture, transform.position + new Vector3(0, 0.3, 0), Quaternion.Euler(0, Angle, 0));
		clone.gameObject.tag = "Voiture";
		
		var properties = clone.GetComponent(VoitureProperties);
		var idv = Voitures.id_voiture; idv++; Voitures.id_voiture = idv;
		properties.Id = idv;		
		properties.MinDistance = Random.Range(0.5, 1);
		properties.Speed = properties.MaxSpeed = Random.Range(MinSpeed, MaxSpeed);
		properties.Respect = Mathf.Sqrt(Random.Range(0.1, 1));
		properties.Sportsmanship = Random.Range(0.1, 1);
		properties.DestAngle = Angle;
		properties.AngleStep = 0;
		
		if(Angle==0)
			properties.Dir = Direction.Nord;
		if(Angle==90)
			properties.Dir = Direction.Est;
		if(Angle==180)
			properties.Dir = Direction.Sud;
		if(Angle==270)
			properties.Dir = Direction.Ouest;
	}
}