		// earthquakes
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

		function processInfo(info, qtt){
			var res = "";
			if(qtt > 0){
											
				res = info.split(",");
				
				var index = res.length - 1;

				while (index >= 0) {
					
					if(res[index].startsWith('year') || res[index].startsWith(' year'))
						res[index] = '<br>' + res[index];
						
					else if(res[index].startsWith('lat') || res[index].startsWith(' lat') )
						res.splice(index, 1);
					else if (res[index].startsWith('long')  || res[index].startsWith(' long') )
						res.splice(index, 1);

					index -= 1;
				}
			}			
			return res;
		}
		
		info.update = function (props) {
			this._div.innerHTML = '<h4>US Significant Earthquakes</h4>' +  (props ?
				'<b>' + props.name + '</b><br />' + props.qtt + ' Significant Earthquakes'
				+processInfo(props.info, props.qtt)
				: 'Hover over a state for quantity <br> Click on the state to see the epicenter*');
		};

		info.addTo(map);


		// get color depending on population density value
		function getColor(d) {
			return d > 100 ? '#800026' :
					d > 50  ? '#BD0026' :
					d > 20  ? '#E31A1C' :
					d > 10  ? '#FC4E2A' :
					d > 5   ? '#FD8D3C' :
					d > 2   ? '#FEB24C' :
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

		var markers = [];

		function zoomToFeature(e) {
			
			while (markers.length > 0)
				map.removeLayer(markers.pop());
			
			map.fitBounds(e.target.getBounds(), {maxZoom: 5});
			
			var info = e.target.feature.properties.info;
			var qtt = e.target.feature.properties.qtt;
			
			if(qtt > 0){
				
				resLat = info.split("lat:");
				resLong = info.split("long:");

				var index = resLat.length - 1;
				
				while (index > 0) {

					var lt = resLat[index].split(",")[0];
					var lg = resLong[index].split(",")[0];
					
					var mark = L.marker([lt, lg]);
					mark.addTo(map);
					markers.push(mark);
					
					index -= 1;
					
				} 
			}
			
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

		map.attributionControl.addAttribution('US Significant Earthquakes; <a href="https://www.ngdc.noaa.gov/ngdc.html"> National Center for Environmental Information (NCEI)</a>');


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 1, 2, 5, 10, 20, 50, 100],
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