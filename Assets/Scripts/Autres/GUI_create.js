#pragma strict

public var text : String = "Object";
public var taille : int = 10;

 
private var x : int;
private var y : int;
private var x0 : int;
private var y0 : int;


private var arbre : GameObject;
public var prefab : GameObject;
private var mousePos : Vector3;

public var global : varGlobal;

//liaison avec ujn autre script
var sc : CameraScript;

var boutton1style : GUIStyle;



function Start () 
{

	x=Screen.width;
	y=Screen.height;
	x0= (taille*x)/100 ;
	y0= 0;
}

function Update () {

}


function OnGUI () {
	
	
	if(!varGlobal.camState)
	{
		// creation d'une boite de taille % de l'ecran
		GUI.Box(Rect (x-x0,y0,x0,y+y0),text);
		GUI.Label(Rect (x-x0+20,y-120,150,20),"f1 = vue du dessus");
		GUI.Label(Rect (x-x0+20,y-80,150,20),"f2 = vue libre");

		
		if (GUI.Button(Rect (x-x0 +20,100,100,70), "Stop")) 
		{
			mousePos = Input.mousePosition;
			mousePos.y = 1.0;
			global.choixPanneaux = panneaux.Stop; //maj variable global de choix
			
		}
		
		if (GUI.Button(Rect (x-x0 +20,180,100,70), "Suppr")) 
		{
			mousePos = Input.mousePosition;
			mousePos.y = 1.0;
			global.choixPanneaux = panneaux.Suppr;//maj variable global de choix
			
		}
	}
}
