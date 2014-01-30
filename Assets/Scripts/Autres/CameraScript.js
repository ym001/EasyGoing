#pragma strict


public var cameraH : GameObject;
public var cameraPersp : GameObject;

private var CameraHpos : Vector3;
private var CameraPerspPos : Vector3;


function Start () 
{
	cameraH.SetActive(true);
	cameraPersp.SetActive(false);
	
	CameraHpos = cameraH.transform.position;
	CameraPerspPos = cameraPersp.transform.position;
	
	if (cameraPersp.rigidbody)
	{
		cameraPersp.rigidbody.freezeRotation = true;
	}
}


function Update () 
{
	switch (varGlobal.camState)
	{
		case varGlobal.camState.CameraHaut:
			
			if (Input.GetKeyDown("f2"))
			{
				varGlobal.camState = CameraView.CameraPersp;
				print("f2");
			}			
			else if (Input.GetKeyDown("f"))
			{
				/*
				cameraH.transform.position.x=cameraPerso.transform.position.x;
				cameraH.transform.position.y=CameraHpos.y;
				cameraH.transform.position.z=cameraPerso.transform.position.z;
				*/
			}
			else
			{
				haut();
			}
		
		break;
		
		case varGlobal.camState.CameraPersp:
			
			if (Input.GetKeyDown("f1"))
			{
				print("f1");
				varGlobal.camState = CameraView.CameraHaut;
				/*
				cameraH.transform.position.x=cameraPerso.transform.position.x;
				cameraH.transform.position.y=CameraHpos.y;
				cameraH.transform.position.z=cameraPerso.transform.position.z;
				*/
			}		
			else if (Input.GetKeyDown("f"))
			{
			}
			else
			{
				persp();
			}
			
		break;
	}
}

// Les deux caméras différentes
function haut()
{
	cameraH.SetActive(true);
	cameraPersp.SetActive(false);
	varGlobal.camEtat = false;
	
	if (Input.GetButton("Fire1"))
    {
		var x = -Input.GetAxis("Mouse X")*2;
		var y = -Input.GetAxis("Mouse Y")*2;
		var sp = varGlobal.camSpeed;
	}
	
	if (Input.GetAxis("Mouse ScrollWheel") < 0) // Arrière
	{
		cameraH.camera.orthographicSize+=varGlobal.camSpeed;
	}
	
	if (Input.GetAxis("Mouse ScrollWheel") > 0) // Avant
	{
		cameraH.camera.orthographicSize-=varGlobal.camSpeed;
	}
	
	cameraH.transform.Translate(x,y,0);
}

// La rotation se fait avec le script : fps associé à la caméra persp: mouseLook.cs 
function persp()
{
	var rotationX : float;
	varGlobal.camEtat = false;
	
	cameraH.SetActive(false);
	cameraPersp.SetActive(true);
	
	cameraPersp.rigidbody.velocity = Vector3.zero;
	cameraPersp.rigidbody.angularVelocity = Vector3.zero;
	
	//cameraPersp.rigidbody.WakeUp();
	
	// Controle la caméra
	
	var x = Input.GetAxis("Mouse X");
	var y = Input.GetAxis("Mouse Y");
	var sp = varGlobal.camSpeed;
	
	if (Input.GetAxis("Mouse ScrollWheel") < 0) // Zoom arrière
	{
		cameraPersp.transform.Translate(0,0,-varGlobal.camSpeed);
	}
	else if (Input.GetAxis("Mouse ScrollWheel") > 0) // Zoom avant
	{
		cameraPersp.transform.Translate(0,0,varGlobal.camSpeed);
	}
	else if (Input.GetKey("z")) // Avancer
	{
		cameraPersp.transform.Translate(0,0,varGlobal.camSpeed);
	}
	else if (Input.GetKey("s")) // Reculer
	{
		cameraPersp.transform.Translate(0,0,-varGlobal.camSpeed);
	}
	else if (Input.GetKey("q")) // Gauche
	{
		cameraPersp.transform.Translate(-varGlobal.camSpeed,0,0);
	}
	else if (Input.GetKey("d")) // Droite
	{
		cameraPersp.transform.Translate(varGlobal.camSpeed,0,0);
	}      
	
	//cameraPersp.rigidbody.Sleep();
}


