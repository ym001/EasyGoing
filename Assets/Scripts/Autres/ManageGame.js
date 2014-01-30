#pragma strict


private var voitures : Component;
private var spawn : Component;

function Start ()
{
	varGlobal.state = GameState.Start;
	varGlobal.stateSim = SimState.Construction;
	voitures = GameObject.Find("Voitures").GetComponent("Voitures");
	spawn = GameObject.Find("Spawner").GetComponent("Spawner");
}

// Instruction de chaque état
function Update () 
{
	// Etat dans lequel se trouve la machine
	switch (varGlobal.state)
	{
		// On lance le jeu
		case GameState.Start:
			stateChange(GameState.Game);
			Construction();
		break;		
		
		// On joue
		case GameState.Game:
			// Si on appuie sur "esc" go état pause
			if (Input.GetKeyDown(KeyCode.Escape))
			{
				stateChange(GameState.Pause);
			}
			else 
			{
				switch (varGlobal.stateSim)
				{
					case SimState.Simulation:
					break;
					
					case SimState.Construction:
					break;
				}
			}
			
		break;
		
		case GameState.Pause:
			// Si on appuie sur "esc" go état game
			if (Input.GetKeyDown(KeyCode.Escape))
			{
				stateChange(GameState.Game);
			}
		break;
		
		// Fin du jeu
		case GameState.End:
		break;
		
		// Changement de niveau
		case GameState.Switch: 
			Application.LoadLevel(varGlobal.nextLevel);
		break;
	}
}


function OnGUI() {}


// Effectue les actions en fonction de l'état
function stateChange(newState : GameState)
{
	varGlobal.state = newState;
	
	switch (varGlobal.state)
	{
		case GameState.Start:
			
		break;
		
		case GameState.Game:
			varGlobal.state=GameState.Game;
		break;
		
		case GameState.Pause:
		
		break;
		
		case GameState.End:
		break;
		
		case GameState.Switch: 
		break;
	}
}


// Active/désactive simulation/construction
function stateSimChange(newState : SimState)
{
	varGlobal.stateSim = newState;
	
	switch(varGlobal.stateSim)
	{
		// Mode construction
		case SimState.Construction:
			Construction();
		break;
		
		// Lancement simulation
		case SimState.Simulation:
			Simulation();
		break;
	}
}


// Désactive simulation
function Construction()
{	
	var comp : MeshRenderer;
	
	voitures.active = false;
	spawn.active = false;
	
	// Destruction des agents
	for (var car in GameObject.FindGameObjectsWithTag("Voiture"))
	{
		Destroy(car);
	}
	
	// Affichage des cellules
	for (var cellule in GameObject.FindGameObjectsWithTag("route"))
	{
		if (cellule.name=="Case(Clone)")
		{
			comp = cellule.gameObject.GetComponent(MeshRenderer);
			comp.enabled = true;
		}
	}
	
	for (var cellule in GameObject.FindGameObjectsWithTag("trottoir"))
	{
		if (cellule.name=="Case(Clone)")
		{
			comp = cellule.gameObject.GetComponent(MeshRenderer);
			comp.enabled = true;
		}
	}
}


// Active simulation
function Simulation()
{

	var comp : MeshRenderer;

	voitures.active=true; 
	spawn.active = true;
	
	// Désaffichage des cellules
	for (var cellule in GameObject.FindGameObjectsWithTag("route"))
	{
		if (cellule.name=="Case(Clone)")
		{
			comp = cellule.gameObject.GetComponent(MeshRenderer);
			comp.enabled = false;
		}
	}
	
	for (var cellule in GameObject.FindGameObjectsWithTag("trottoir"))
	{
		if (cellule.name=="Case(Clone)")
		{
			comp= cellule.gameObject.GetComponent(MeshRenderer);
			comp.enabled = false;
		}
	}
}

