
var selected = new Set();
var sort_index = {"titlu":0, "autori":1, "limba original":2, "an aparitie":3, "numar pagini":4};

function rand(a, b)
{
	return Math.floor(a + Math.random()*(b-a+1));
}

function clock()
{
	div_clock = document.getElementById("container_clock");
	let d = new Date();
	let text = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	div_clock.innerHTML = text;
}

function finish_load()
{
	let loader = document.getElementById("loader_container");
	loader.style.display = "none";
}

window.onload = function()
{
	if(document.getElementById("loader_container"))
		setTimeout(finish_load, 4000);

	let login_button = document.getElementById("login_button");
	let login_div = document.getElementById("login");
	login_div.onclick = function()
	{
		this.style.display="none";
	}
	let form = document.querySelector("#login form");
	form.onclick = function(e)
	{
		e.stopPropagation();
	}
	if(login_button)
		login_button.onclick = function()
		{
			login_div.style.display="flex";
		}
	let submit = document.getElementById("submit");
	submit.onclick = function()
	{
		login_div.style.display="none";
	}

	if(localStorage.getItem("selected"))
		selected = new Set(JSON.parse(localStorage.getItem("selected")));
	var randuri=Array.from(document.querySelectorAll("#tab tbody tr"));
	for(let i = 0; i < randuri.length; i++)
		if(selected.has(randuri[i].children[0].innerHTML.toLowerCase()))
			randuri[i].classList.add("selectat");
	for(let i = 0 ; i < randuri.length; i++)
		randuri[i].onclick = function()
		{
			this.classList.toggle("selectat");
			if(this.classList.contains("selectat"))
			{
				selected.add(this.children[0].innerHTML.toLowerCase());
			}
			else
			{
				selected.delete(this.children[0].innerHTML.toLowerCase());
			}
			localStorage.setItem("selected", JSON.stringify(Array.from(selected)));
		}

	
	div_clock = document.createElement("div");
	div_clock.id = "container_clock";
	div_clock.style.textAlign="center";
	div_clock.style.backgroundColor = "gray";
	div_clock.style.fontSize = "25px";
	div_clock.style.width = "100%";
	div_clock.style.height = "50px";
	div_clock.style.paddingTop = "25px";
	document.body.appendChild(div_clock);
	setInterval(clock, 1000);


	div_butoane = document.getElementById("container_butoane");
	if(div_butoane)
	{
		div_butoane.onclick = function(e)
		{
			if(e.target != e.currentTarget)
				this.style.borderColor = "rgb(" + rand(0,255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
			else this.style.backgroundColor = "rgb(" + rand(0,255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
		}


		btn_sort = document.getElementById("sorteaza");
		btn_sort.onclick = function(e)
		{
			
			let attr = prompt("Introduceti atributul dupa care doriti sa sortati", "Titlu");
			attr = attr.toLowerCase().trim();
			let attrs = document.getElementById("attrs");
			let poz = null;
			for(let i = 0 ; i < attrs.children.length; i++)
				if(attr == attrs.children[i].innerHTML.toLowerCase())
					{
						poz = i;
						break;
					}
			if(poz === null)
				alert("Atributul introdus nu exista!");
			else 
			{
				var child_index = sort_index[attr];
				var randuri=Array.from(document.querySelectorAll("#tab tbody tr"));
				randuri.sort(function(a,b)
				{
					let rez;
					if(child_index < 3)
					{
						let cmp1 = a.children[child_index].innerHTML;
						let cmp2 = b.children[child_index].innerHTML;
						rez = cmp1.localeCompare(cmp2);
					}
					else
					{
						let cmp1 = parseInt(a.children[child_index].innerHTML);
						let cmp2 = parseInt(b.children[child_index].innerHTML);
						if(cmp1 > cmp2)
							rez = 1;
						else if(cmp1 < cmp2)
								rez = -1;
							else rez = 0;
					}
					return rez;
				})
				tbody = document.getElementById("carti");
				for(let i = 0; i < randuri.length; i++)
					tbody.appendChild(randuri[i]);
			}
		}


		btn_sterge = document.getElementById("sterge");
		btn_sterge.onclick = function(e)
		{
			
			let attr = prompt("Introduceti atributul dupa care doriti sa stergeti", "Titlu");
			attr = attr.toLowerCase().trim();
			let val = prompt("Acum introduceti valoarea acestui atribut");
			val = val.toLowerCase().trim();
			let attrs = document.getElementById("attrs");
			let poz = null;
			for(let i = 0 ; i < attrs.children.length; i++)
				if(attr == attrs.children[i].innerHTML.toLowerCase())
					{
						poz = i;
						break;
					}
			if(poz === null)
				alert("Atributul introdus nu exista!");
			else
			{
				var child_index = sort_index[attr];
				var randuri=Array.from(document.querySelectorAll("#tab tbody tr"));
				let ok = false;
				for(let i = 0; i < randuri.length; i++)
					{
						if(randuri[i].children[child_index].innerHTML.toLowerCase() == val)
							{
								randuri[i].remove();
								ok = true;
							}
					}
				if(!ok)
					alert("Valoare introdusa nu a fost gasita!");
			}
		}


		btn_select = document.getElementById("select");
		btn_select.onclick = function(e)
		{
			
			let attr = prompt("Introduceti atributul dupa care doriti sa stergeti", "Titlu");
			attr = attr.toLowerCase().trim();
			let val = prompt("Acum introduceti valoarea acestui atribut");
			val = val.toLowerCase().trim();
			let attrs = document.getElementById("attrs");
			let poz = null;
			for(let i = 0 ; i < attrs.children.length; i++)
				if(attr == attrs.children[i].innerHTML.toLowerCase())
					{
						poz = i;
						break;
					}
			if(poz === null)
				alert("Atributul introdus nu exista!");
				else
				{
					var child_index = sort_index[attr];
					var randuri=Array.from(document.querySelectorAll("#tab tbody tr"));
					let ok = false;
					for(let i = 0; i < randuri.length; i++)
						{
							if(randuri[i].children[child_index].innerHTML.toLowerCase() == val)
								{
									randuri[i].classList.add("selectat");
									selected.add(randuri[i].children[0].innerHTML.toLowerCase())
									localStorage.setItem("selected", JSON.stringify(Array.from(selected)));
									ok = true;
								}
						}
					if(!ok)
						alert("Valoare introdusa nu a fost gasita!");
				}
		}


		btn_deselect = document.getElementById("deselect");
		btn_deselect.onclick = function(e)
		{
			
			var randuri_selectate = document.getElementsByClassName("selectat");
			while(randuri_selectate[0])
			{
				selected.delete(randuri_selectate[0].children[0].innerHTML.toLowerCase());
				localStorage.setItem("selected", JSON.stringify(Array.from(selected)));
				randuri_selectate[0].classList.remove("selectat");
			}
			
		}


		btn_rand = document.getElementById("rand_select");
		btn_rand.onclick = function(e)
		{
			
			var randuri=Array.from(document.querySelectorAll("#tab tbody tr"));
			var randuri_neselectate = [];
			for(let i = 0; i < randuri.length; i++)
				if(!randuri[i].classList.contains("selectat"))
					randuri_neselectate.push(randuri[i]);
			if(randuri_neselectate.length)
			{
				let rand_index = rand(0, randuri_neselectate.length-1);
				randuri_neselectate[rand_index].classList.add("selectat");
				selected.add(randuri_neselectate[rand_index].children[0].innerHTML.toLowerCase())
				localStorage.setItem("selected", JSON.stringify(Array.from(selected)));
			}
			else alert("Toate randurile sunt deja selectate!");
		}


		btn_sterge_select = document.createElement("button");
		btn_sterge_select.id="sterge_select";
		btn_sterge_select.innerHTML = "Sterge cartile selectate";
		btn_sterge_select.style.textCss = window.getComputedStyle(btn_rand).textCss;
		btn_sterge_select.onclick = function(e)
		{
			
			var randuri_selectate = document.getElementsByClassName("selectat");
			while(randuri_selectate[0])
			{
				selected.delete(randuri_selectate[0].children[0].innerHTML.toLowerCase());
				localStorage.setItem("selected", JSON.stringify(Array.from(selected)));
				randuri_selectate[0].remove();
			}
		}
		let container_butoane = document.getElementById("container_butoane");
		container_butoane.appendChild(btn_sterge_select);


		window.onkeypress = function(e)
		{
			if(e.key == "d" || e.key == "D")
			{
				var randuri_selectate = document.getElementsByClassName("selectat");
				while(randuri_selectate[0])
				{
					selected.delete(randuri_selectate[0].children[0].innerHTML.toLowerCase());
					localStorage.setItem("selected", JSON.stringify(Array.from(selected)));
					randuri_selectate[0].remove();
				}
			}
		}
	}
}