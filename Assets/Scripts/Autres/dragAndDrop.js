 
private var screenSpace;
private var offset;

     
function OnMouseDown()
{
	//translate the cubes position from the world to Screen Point
	screenSpace = Camera.main.WorldToScreenPoint(transform.position);         
	//calculate any difference between the cubes world position and the mouses Screen position converted to a world point  
	offset = transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y, screenSpace.z));       
	
	// ajout de rigidbody pour "epouser le terrain" lors du placement
	 gameObject.AddComponent(Rigidbody);
	 gameObject.rigidbody.useGravity = true ;
}
     
     
function OnMouseDrag() 
{   
	//recuperation de la position de la souris + convertion des coordonée de la souris avec celle du monde
	var curScreenSpace = Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z);    	     
	var curPosition = Camera.main.ScreenToWorldPoint(curScreenSpace) + offset;     
	
	//mise a jour de la position de l'objet
	transform.position = curPosition;	
}


function OnMouseUp()
{
	//suppression du rigidbody car inutile une fois placer
	Destroy(rigidbody);
}