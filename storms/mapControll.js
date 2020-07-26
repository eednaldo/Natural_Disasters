		// severe storms
		var map = L.map('map').setView([37.8, -96], 3);

		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox/light-v9',
			tileSize: 512,
			zoomOffset: -1
		}).addTo(map);


		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};
		
		info.update = function (props) {
			this._div.innerHTML = '<h4>US Severe Storms</h4>' +  (props ?
				'<b>' + props.name + '</b><br />' + props.qtt + ' Severe Storms <br>'
				: 'Hover over a state for quantity<br> Click for more information');
		};

		info.addTo(map);


		// get color depending on population density value
		function getColor(d) {
			return d > 70000 ? '#800026' :
					d > 55000 ? '#BD0026' :
					d > 40000  ? '#E31A1C' :
					d > 30000  ? '#FC4E2A' :
					d > 20000   ? '#FD8D3C' :
					d > 10000   ? '#FEB24C' :
					d > 1   ? '#FED976' :
								'#FFEDA0';
		}

		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.qtt)
			};
		}

		function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds(), {maxZoom: 5});
			let p = e.target.feature.properties;
			mapClick(p);
		}
		
		function mapClick(p){
			
			let divInfo = document.getElementById("divInfo");
			let tbody = document.getElementById("testBody");

			divInfo.style.display = "block";
			tbody.innerHTML = " ";
			divInfo.scrollTop = 0;
			let th_state = document.getElementById("th_State");
			th_state.style.textAlign =  "center";
			let state_name = p.name;
			th_state.innerHTML = state_name;
			
			if (p.qtt > 0){
				let info = jsInfo.find(x => (x.state == p.name.toLowerCase()) || (' '+x.state == p.name.toLowerCase())).info;			
				info.forEach(buildColumn);
			}
		}
		
		function buildColumn(value){
			loadTableData(value);
		}
		  
		  function loadTableData(item) {
			  let tbody = document.getElementById("testBody");		
			  let row = tbody.insertRow();
			  let eventType = row.insertCell(0);
			  eventType.innerHTML = item.event_type;
			  let averageMinutes = row.insertCell(1);
			  averageMinutes.innerHTML = item.average_minutes;
			  let year = row.insertCell(2);
			  year.innerHTML = item.year;

		  }


		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}

		geojson = L.geoJson(statesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		map.attributionControl.addAttribution('Severe Storms; <a href="https://data.nodc.noaa.gov/cgi-bin/iso?id=gov.noaa.ncdc:C00773"> National Centers for Environment Information(NCEI)</a>');


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 10000, 20000, 30000, 40000, 55000, 70000],
				labels = [],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);