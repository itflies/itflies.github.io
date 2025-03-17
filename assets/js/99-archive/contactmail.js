function fdcnt() {
							document.getElementById("cnt2").innerHTML = ("s" + "ales" + "@hamsters" + ".ch").replace("sal", "inf").replace("hamsters", "flies").replace("es@", "o@it");
							document.getElementById("cnt2").href = "mailto:" + document.getElementById("cnt2").innerHTML
							document.getElementById("cnt1").style.visibility = "visible"
							document.getElementById("cnt0").style.visibility = "hidden"
						}