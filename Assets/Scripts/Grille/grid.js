#pragma strict

public var nbCase : Vector3;
public var prefab : Transform; 
public var sizePrefab : float;

function Start () 
{
	CreateGrid(); //init grille en prenant compte du terrain ( croisement, route, trottoir)
}


function CreateGrid()
{
	for (var x : int = nbCase.x / -2; x < nbCase.x / 2; x++)
	{
		for (var z : int = nbCase.z / -2; z < nbCase.z / 2; z++)
		{
			var hit : RaycastHit;
			var ray : Ray = new Ray(new Vector3(x*sizePrefab+sizePrefab/2, 2, z*sizePrefab+sizePrefab/2), new Vector3(0,-1,0));
			
			// Si le rayon touche un objet
			if (Physics.Raycast(ray, hit))
			{
				var hitTag : String = hit.transform.tag;
				var clone : Transform;
				
				switch (hitTag)
				{
					// Si c'est un trottoir
					case "trottoir" :
						clone = Instantiate(prefab, new Vector3(x*sizePrefab+sizePrefab/2, 2, z*sizePrefab+sizePrefab/2), Quaternion.identity);
						clone.gameObject.tag = hitTag;
					break;
					
					// Si c'est une route
					case "route" :
						clone = Instantiate(prefab, new Vector3(x*sizePrefab+sizePrefab/2, 2, z*sizePrefab+sizePrefab/2), Quaternion.identity);
						clone.gameObject.tag = "route";
					break;
					
					// Si c'est un croisement
					case "croisement" :
						clone = Instantiate(prefab, new Vector3(x*sizePrefab+sizePrefab/2, 2, z*sizePrefab+sizePrefab/2), Quaternion.identity);
						clone.gameObject.tag = "croisement";
					break;
				}
			}
		}
	}
}
