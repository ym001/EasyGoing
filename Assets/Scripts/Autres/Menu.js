#pragma strict

private var menu_x : int = Screen.width*2/5;
private var menu_y : int = Screen.height*1/5;
private var menuClicked : boolean = false;

function OnGUI () 
{
	if (varGlobal.GuiConstructionVisible && !(varGlobal.msg_id == 11 || varGlobal.msg_id % 1 == 0 && varGlobal.msg_id != 0))
	{
		if (GUI.Button(Rect (0, 0, 60, 20), "Menu"))
		{
			menuClicked = true;
			varGlobal.GuiConstructionVisible = false;
		}
	}
	
	if (menuClicked)
	{
		GUI.Box(Rect (menu_x, menu_y, Screen.width*1/5, Screen.height*3/5), "MENU");
		
		var tab = ["Continuer", "Aide", "Quitter"];
		var i : int;
		
		for (i=0; i<tab.length; i++)
		{
			if (GUI.Button(Rect (menu_x+20, menu_y+40 + i*60, Screen.width - (menu_x + 20)*2, 40), tab[i]))
			{
				switch (i)
				{
					case 0: // Continuer
						menuClicked = false;
						varGlobal.GuiConstructionVisible = true;
						break;
					
					case 1: // Aide
						break;
					
					case 2: // Quitter
						Application.LoadLevel(0);
						break;
				}
			}
		}
	}
	
	
	/*
	//start button
	if (GUI.Button (Rect (((Screen.width*10)/100),((Screen.height*10)/100),Screen.width-2*((Screen.width*10)/100),100), "Start")) 
	{
		print ("You clicked the button: Start");
		Application.LoadLevel(1);
	}
	
	//quit button
	if (GUI.Button (Rect (((Screen.width*10)/100),2*((Screen.height*10)/100)+100,Screen.width-2*((Screen.width*10)/100),100), "Quit")) 
	{
		print ("You clicked the button: QUit");
		Application.Quit();
	}*/
}
