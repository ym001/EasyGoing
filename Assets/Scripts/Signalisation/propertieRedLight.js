#pragma strict

enum red_light_color
{
	red,
	orange,
	green
}

var lightGameObject : Light;

var GreenDuration : float = 5;
var OrangeDuration : float = 1;
var RedDuration : float = 4;

var etat : red_light_color;
var NextChange : float = 0;

function Start()
{
	lightGameObject = gameObject.AddComponent(Light);
	lightGameObject.light.color = Color.red;
	lightGameObject.range = 13;
	lightGameObject.intensity = 2;
	
	Update();
}

function Update()
{
	if (Time.timeSinceLevelLoad < NextChange)
		return;

	switch (etat)
	{
		case red_light_color.red:
			etat = red_light_color.green;
			NextChange += GreenDuration;
			lightGameObject.light.color = Color.green;
			break;
		
		case red_light_color.orange:
			etat = red_light_color.red;
			NextChange += RedDuration;
			lightGameObject.light.color = Color.red;
			break;
		
		case red_light_color.green:
			etat = red_light_color.orange;
			NextChange += OrangeDuration;
			lightGameObject.light.color = Color.yellow;
			break;
	}
}