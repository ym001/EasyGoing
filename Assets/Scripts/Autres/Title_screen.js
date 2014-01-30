#pragma strict

private var menu_x : int = Screen.width*15/20;
private var menu_y : int = Screen.height*5/10;

function OnGUI () 
{
	GUI.Box(Rect (menu_x, menu_y, Screen.width*4/20, Screen.height*4/10), "");
	
	var tab = ["Nouvelle partie", "Aide", "Quitter"];
	var i : int;
	
	for (i=0; i<tab.length; i++)
	{
		if (GUI.Button(Rect (menu_x+10, menu_y+10 + i*60, Screen.width*4/20 - 20, 40), tab[i]))
		{
			switch (i)
			{
				case 0: // Nouvelle partie
					Application.LoadLevel(1);
					break;
				
				case 1: // Aide
					break;
				
				case 2: // Quitter
					Application.Quit();
					break;
			}
		}
	}
}
