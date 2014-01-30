using UnityEngine;
using System.Collections;

public class GridScript : MonoBehaviour {
	
	public Transform CellPrefab;
	public Vector3 Size;
	
	// Use this for initialization
	void Start () {
		CreateGrid();
	}
	
	void CreateGrid(){
		for(int x = 0; x < Size.x; x++){
			for(int z = 0; z < Size.z; z++){
				Instantiate(CellPrefab, new Vector3(x*10, 0, z*10), Quaternion.identity);
			}
		}
	}
}
