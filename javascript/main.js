    // Variables
    var list_gdp = []
    var list_normalized_val = [[],[],[],[],[],[]]
    var slider_values = [0.4,0.4,0.4,0.4,0.4]
    var sum_normalized_val = [] 
    var list_crime = []
    var list_residential = []
    var list_pollution = []
    var list_happinessScore = []
    var list_countryNames = ["Belgium","France","Germany","Italy","Luxembourg","Netherlands"]

    // Functions to get rdf triples from triplestore
    getGDP();
    getCrime();
    getresidential();
    getpollution();
    gethappinessScore();

    // Creating map and setting properties
    var mymap = L.map('mapid', {zoomControl:true, maxZoom: 12, minZoom: 4}).setView([49.8175, 15.4730], 4);
    mymap.doubleClickZoom.disable();
    mymap.setMaxBounds([
    [38,-8],
    [55,25]
    ]);

    // Adding tile layer map from OSM
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
    }).addTo(mymap);

    // Function for querying GDP data from the triplestore
    function getGDP(){
    let qry = "select * from <http://course.geoinfo2018.org/GC> where { "+
    "<http://course.geoinfo2018.org/GC#Belgium> <http://course.geoinfo2018.org/GC#hasGDP> ?c."+
    "<http://course.geoinfo2018.org/GC#France> <http://course.geoinfo2018.org/GC#hasGDP> ?c1."+
    "<http://course.geoinfo2018.org/GC#Germany> <http://course.geoinfo2018.org/GC#hasGDP> ?c2."+
    "<http://course.geoinfo2018.org/GC#Italy> <http://course.geoinfo2018.org/GC#hasGDP> ?c3."+
    "<http://course.geoinfo2018.org/GC#Luxembourg> <http://course.geoinfo2018.org/GC#hasGDP> ?c4."+
    "<http://course.geoinfo2018.org/GC#Netherlands> <http://course.geoinfo2018.org/GC#hasGDP> ?c5.}";
    $.get("http://giv-oct2.uni-muenster.de:8890/sparql", {
    query: qry,
    output: 'json'
    },
    function(data){
    // Pushing data into list
    list_gdp.push(parseFloat(data.results.bindings[0].c.value))
    list_gdp.push(parseFloat(data.results.bindings[0].c1.value))
    list_gdp.push(parseFloat(data.results.bindings[0].c2.value))
    list_gdp.push(parseFloat(data.results.bindings[0].c3.value))
    list_gdp.push(parseFloat(data.results.bindings[0].c4.value))
    list_gdp.push(parseFloat(data.results.bindings[0].c5.value))
    console.log("1: "+list_gdp)
    calc_normalized_data(list_gdp, 0, true);
    });
    }

    // Function for querying Crime data from the triplestore
    function getCrime(){
        let qry = "select * from <http://course.geoinfo2018.org/GC> where { "+
        "<http://course.geoinfo2018.org/GC#Belgium> <http://course.geoinfo2018.org/GC#hasIntentionalHomicides> ?c."+
        "<http://course.geoinfo2018.org/GC#France> <http://course.geoinfo2018.org/GC#hasIntentionalHomicides> ?c1."+
        "<http://course.geoinfo2018.org/GC#Germany> <http://course.geoinfo2018.org/GC#hasIntentionalHomicides> ?c2."+
        "<http://course.geoinfo2018.org/GC#Italy> <http://course.geoinfo2018.org/GC#hasIntentionalHomicides> ?c3."+
        "<http://course.geoinfo2018.org/GC#Luxembourg> <http://course.geoinfo2018.org/GC#hasIntentionalHomicides> ?c4."+
        "<http://course.geoinfo2018.org/GC#Netherlands> <http://course.geoinfo2018.org/GC#hasIntentionalHomicides> ?c5.}";
        $.get("http://giv-oct2.uni-muenster.de:8890/sparql", {
        query: qry,
        output: 'json'
        },
        function(data){
            // Pushing data into list
            list_crime.push(parseFloat(data.results.bindings[0].c.value))
            list_crime.push(parseFloat(data.results.bindings[0].c1.value))
            list_crime.push(parseFloat(data.results.bindings[0].c2.value))
            list_crime.push(parseFloat(data.results.bindings[0].c3.value))
            list_crime.push(parseFloat(data.results.bindings[0].c4.value))
            list_crime.push(parseFloat(data.results.bindings[0].c5.value))
            console.log("2: "+list_crime)
            calc_normalized_data(list_crime, 1);
        });
    }

    // Function for querying GDP data from the triplestore
    function getresidential(){
        let qry = "select * from <http://course.geoinfo2018.org/GC> where { "+
        "<http://course.geoinfo2018.org/GC#Belgium> <http://course.geoinfo2018.org/GC#hasAveragePrice> ?c."+
        "<http://course.geoinfo2018.org/GC#France> <http://course.geoinfo2018.org/GC#hasAveragePrice> ?c1."+
        "<http://course.geoinfo2018.org/GC#Germany> <http://course.geoinfo2018.org/GC#hasAveragePrice> ?c2."+
        "<http://course.geoinfo2018.org/GC#Italy> <http://course.geoinfo2018.org/GC#hasAveragePrice> ?c3."+
        "<http://course.geoinfo2018.org/GC#Luxembourg> <http://course.geoinfo2018.org/GC#hasAveragePrice> ?c4."+
        "<http://course.geoinfo2018.org/GC#Netherlands> <http://course.geoinfo2018.org/GC#hasAveragePrice> ?c5.}";
        $.get("http://giv-oct2.uni-muenster.de:8890/sparql", {
        query: qry,
        output: 'json'
        },
        function(data){
            // Pushing data into list
            list_residential.push(parseFloat(data.results.bindings[0].c.value))
            list_residential.push(parseFloat(data.results.bindings[0].c1.value))
            list_residential.push(parseFloat(data.results.bindings[0].c2.value))
            list_residential.push(parseFloat(data.results.bindings[0].c3.value))
            list_residential.push(parseFloat(data.results.bindings[0].c4.value))
            list_residential.push(parseFloat(data.results.bindings[0].c5.value))
            console.log("3:"+list_residential)
            calc_normalized_data(list_residential, 2);
        });
    }

    // Function for querying Air Pollution data from the triplestore
    function getpollution(){
        let qry = "select * from <http://course.geoinfo2018.org/GC> where { "+
        "<http://course.geoinfo2018.org/GC#Belgium> <http://course.geoinfo2018.org/GC#hasAirPollution> ?c."+
        "<http://course.geoinfo2018.org/GC#France> <http://course.geoinfo2018.org/GC#hasAirPollution> ?c1."+
        "<http://course.geoinfo2018.org/GC#Germany> <http://course.geoinfo2018.org/GC#hasAirPollution> ?c2."+
        "<http://course.geoinfo2018.org/GC#Italy> <http://course.geoinfo2018.org/GC#hasAirPollution> ?c3."+
        "<http://course.geoinfo2018.org/GC#Luxembourg> <http://course.geoinfo2018.org/GC#hasAirPollution> ?c4."+
        "<http://course.geoinfo2018.org/GC#Netherlands> <http://course.geoinfo2018.org/GC#hasAirPollution> ?c5.}";
        $.get("http://giv-oct2.uni-muenster.de:8890/sparql", {
        query: qry,
        output: 'json'
        },
        function(data){
            // Pushing data into list
            list_pollution.push(parseFloat(data.results.bindings[0].c.value))
            list_pollution.push(parseFloat(data.results.bindings[0].c1.value))
            list_pollution.push(parseFloat(data.results.bindings[0].c2.value))
            list_pollution.push(parseFloat(data.results.bindings[0].c3.value))
            list_pollution.push(parseFloat(data.results.bindings[0].c4.value))
            list_pollution.push(parseFloat(data.results.bindings[0].c5.value))
            console.log("4:"+list_pollution);
            calc_normalized_data(list_pollution, 3);
        });
    }

    // Function for querying Happiness Score data from the triplestore
    function gethappinessScore(){
        let qry = "select * from <http://course.geoinfo2018.org/GC> where { "+
        "<http://course.geoinfo2018.org/GC#Belgium> <http://course.geoinfo2018.org/GC#hasHappinessScore> ?c."+
        "<http://course.geoinfo2018.org/GC#France> <http://course.geoinfo2018.org/GC#hasHappinessScore> ?c1."+
        "<http://course.geoinfo2018.org/GC#Germany> <http://course.geoinfo2018.org/GC#hasHappinessScore> ?c2."+
        "<http://course.geoinfo2018.org/GC#Italy> <http://course.geoinfo2018.org/GC#hasHappinessScore> ?c3."+
        "<http://course.geoinfo2018.org/GC#Luxembourg> <http://course.geoinfo2018.org/GC#hasHappinessScore> ?c4."+
        "<http://course.geoinfo2018.org/GC#Netherlands> <http://course.geoinfo2018.org/GC#hasHappinessScore> ?c5.}";
        $.get("http://giv-oct2.uni-muenster.de:8890/sparql", {
        query: qry,
        output: 'json'
        },
        function(data){
            // Pushing data into list
            list_happinessScore.push(parseFloat(data.results.bindings[0].c.value))
            list_happinessScore.push(parseFloat(data.results.bindings[0].c1.value))
            list_happinessScore.push(parseFloat(data.results.bindings[0].c2.value))
            list_happinessScore.push(parseFloat(data.results.bindings[0].c3.value))
            list_happinessScore.push(parseFloat(data.results.bindings[0].c4.value))
            list_happinessScore.push(parseFloat(data.results.bindings[0].c5.value))
            console.log("5:"+list_happinessScore);
            calc_normalized_data(list_happinessScore, 4, true);
            createGeoJSONLayer();            
        });
    }
            
    // adding GeoJSON layer
    function createGeoJSONLayer(){
        $.getJSON("map.geojson",function(data){
        // adding GeoJSON layer to the map once the file is loaded
        var datalayer = L.geoJson(data,{
        onEachFeature: function(feature, featureLayer){
        // add factors' values to each country
        if(feature.properties.name=='Belgium'){
        featureLayer.bindPopup("<p><b>COUNTRY: </b>"+ feature.properties.name + "</br><b> GDP : </b>" + list_gdp[0]+ "</br><b> CRIME : </b>" +list_crime[0]+"</br><b> RESIDENTIAL Price : </b>" + list_residential[0] + "</br><b> POLLUTION : </b>" + list_pollution[0]+ "</br><b> Happiness Score : </b>" + list_happinessScore[0]) ;}
        else if(feature.properties.name=='France'){
        featureLayer.bindPopup("<p><b>COUNTRY: </b>"+ feature.properties.name + "</br><b> GDP: </b>" + list_gdp[1] + " </br><b> CRIME : </b>" + list_crime[1]+ "</br><b> RESIDENTIAL PriceS : </b>" + list_residential[1] + "<br><b> POLLUTION : </b>" + list_pollution[1]+ "</br><b> Happiness Score : </b>" + list_happinessScore[1]);}
        else if(feature.properties.name=='Germany'){
        featureLayer.bindPopup("<p><b>COUNTRY: </b>"+ feature.properties.name + "</br><b> GDP: </b>" + list_gdp[2] + "</br><b> CRIME: </b>" + list_crime[2]+ "</br><b> RESIDENTIAL PriceS : </b>" + list_residential[2] + "</br><b> POLLUTION: </b>" + list_pollution[2]+ "</br><b> Happiness Score : </b>" + list_happinessScore[2]);}
        else if(feature.properties.name=='Italy'){
        featureLayer.bindPopup("<p><b>COUNTRY: </b>"+ feature.properties.name + "</br><b> GDP: </b>" + list_gdp[3] + "</br><b> CRIME: </b>" + list_crime[3]+ "</br><b> RESIDENTIAL PriceS : </b>" + list_residential[3] + "</br><b> POLLUTION : </b>" + list_pollution[3]+ "</br><b> Happiness Score : </b>" + list_happinessScore[3]);}
        else if(feature.properties.name=='Luxembourg'){
        featureLayer.bindPopup("<p><b>COUNTRY: </b>"+ feature.properties.name + "</br><b> GDP: </b>" + list_gdp[4] + "</br><b> CRIME: </b>" + list_crime[4]+ "</br><b>  RESIDENTIAL PriceS: </b>" + list_residential[4]+ "</br><b> POLLUTION: </b>" + list_pollution[4]+ "</br><b> Happiness Score : </b>" + list_happinessScore[4]);}
        else if(feature.properties.name=='Netherlands'){
        featureLayer.bindPopup("<p><b>COUNTRY: </b>"+ feature.properties.name + "</br><b> GDP: </b>" + list_gdp[5] + "</br><b> crime: </b>" + list_crime[5]+ "</br><b> RESIDENTIAL PriceS: </b>" + list_residential[5] + "</br><b> POLLUTION: </b>" + list_pollution[5]+ "</br><b> Happiness Score : </b>" + list_happinessScore[5]);}
        }
        }).addTo(mymap);
        mymap.fitBounds(datalayer.getBounds());
        });
    } 

    // computing normalized data
    function calc_normalized_data(values, attribute_index, positve = false){
        var normalizedValue;
    
        var max_min = {max:values[0], min:values[0]};
        get_max_min(values, max_min);
        console.log("///////////////")
    
        for(var i = 0; i<values.length; i++){
            // checking wheather factor sent is positve or negative to use the proper formula
            if(positve)
                normalizedValue = (values[i]-max_min.min)/(max_min.max-max_min.min);
            else
                normalizedValue = (max_min.max-values[i])/(max_min.max-max_min.min);
            list_normalized_val[i][attribute_index] = normalizedValue;
        }
    }
    // computing Max and Min values for each factor 
    function get_max_min(values ,max_min_val){
        for(var i = 0; i<values.length; i++){
            if(max_min_val.max < values[i])
                max_min_val.max = values[i]
            if(max_min_val.min > values[i])
                max_min_val.min = values[i]
        }
    }

    // Visualization of the markers and list of countries
    var orderIndex = [3,2,1,4,5,6];
    var marker1, marker2, marker3, marker4, marker5, marker6;
    addMarkers(orderIndex);
    initializeCountryOrder(orderIndex);

    // Functionality for changing countries' order according to selected range of gdp
    var slider = document.getElementById("gdpRange");
    var output = document.getElementById("gdpV");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        removeMarker();
        if (output.innerHTML==1)
        {
            slider_values[0] = 0.1;
        }      
        else if(output.innerHTML==2)
        {
            slider_values[0] = 0.4;
        }
        else if(output.innerHTML==3)
        {
            slider_values[0] = 0.7;
        }
        sum_slider_val = getSumSliderValues();
        orderIndex = [1,2,3,4,5,6]
        get_sum_norm_result();
        orderIndex = order_countries(orderIndex, sum_slider_val);
        console.log("index: "+orderIndex);
        addMarkers(orderIndex);
        initializeCountryOrder(orderIndex);
    }

    // Functionality for changing countries' order according to selected range of happiness
    var slider = document.getElementById("happinessRange");
    var output = document.getElementById("happinessV");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        removeMarker();
        if (output.innerHTML==1)
        {
            slider_values[1] = 0.1;
        }      
        else if(output.innerHTML==2)
        {
            slider_values[1] = 0.4;
        }
        else if(output.innerHTML==3)
        {
            slider_values[1] = 0.7;
        }
        sum_slider_val = getSumSliderValues();
        orderIndex = [1,2,3,4,5,6]
        get_sum_norm_result();
        orderIndex = order_countries(orderIndex, sum_slider_val);
        console.log("index: "+orderIndex);
        addMarkers(orderIndex);
        initializeCountryOrder(orderIndex);
    }

    // Functionality for changing countries' order according to selected range of residential price
    var slider = document.getElementById("rPriceRange");
    var output = document.getElementById("rPricerimeV");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        removeMarker();
        if (output.innerHTML==1)
        {
            slider_values[2] = 0.1;
        }      
        else if(output.innerHTML==2)
        {
            slider_values[2] = 0.4;
        }
        else if(output.innerHTML==3)
        {
            slider_values[2] = 0.7;
        }
        sum_slider_val = getSumSliderValues();
        orderIndex = [1,2,3,4,5,6]
        get_sum_norm_result();
        orderIndex = order_countries(orderIndex, sum_slider_val);
        console.log("index: "+orderIndex);
        addMarkers(orderIndex);
        initializeCountryOrder(orderIndex);
    }

    // Functionality for changing countries' order according to selected range of air pollution
    var slider = document.getElementById("airPollutionRange");
    var output = document.getElementById("airPollutionV");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        removeMarker();
        if (output.innerHTML==1)
        {
            slider_values[3] = 0.1;
        }      
        else if(output.innerHTML==2)
        {
            slider_values[3] = 0.4;
        }
        else if(output.innerHTML==3)
        {
            slider_values[3] = 0.7;
        }
        sum_slider_val = getSumSliderValues();
        orderIndex = [1,2,3,4,5,6]
        get_sum_norm_result();
        orderIndex = order_countries(orderIndex, sum_slider_val);
        console.log("index: "+orderIndex);
        addMarkers(orderIndex);
        initializeCountryOrder(orderIndex);
    }

    // Functionality for changing countries' order according to selected range of crime statistics
    var slider = document.getElementById("crimeRange");
    var output = document.getElementById("rPricerimeV");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        removeMarker();
        if (output.innerHTML==1)
        {
            slider_values[4] = 0.1;
        }      
        else if(output.innerHTML==2)
        {
            slider_values[4] = 0.4;
        }
        else if(output.innerHTML==3)
        {
            slider_values[4] = 0.7;
        }
        sum_slider_val = getSumSliderValues();
        orderIndex = [1,2,3,4,5,6]
        get_sum_norm_result();
        orderIndex = order_countries(orderIndex, sum_slider_val);
        console.log("index: "+orderIndex);
        addMarkers(orderIndex);
        initializeCountryOrder(orderIndex);
    }

    // Function for sorting countries according to user choice in slider ranges
    function order_countries(country_index, sum_slider_val){
        sort(country_index);
        var list_con_index = [];
        var count = 0;
        for(var i = sum_normalized_val.length -1; i>=0; i--){
            if(sum_normalized_val[i] <= sum_slider_val){
                list_con_index[count] = i+1;
                count = count +1;
            }
        }
        if(count<sum_normalized_val.length){
            for(var i = 0; i<sum_normalized_val.length; i++){
                if(sum_normalized_val[i] > sum_slider_val){
                list_con_index[count] = i+1;
                count = count +1;
                }
            }
        } 
        return list_con_index;
    }
    
    // Function for sorting normalized values ascendinly
    function sort(country_index){
        var temp1 = 0.0;
        var temp2 =0;
        for(var i = 0; i<sum_normalized_val.length; i++){
            for(var j = i+1; j<sum_normalized_val.length; j++){
                if(sum_normalized_val[i] > sum_normalized_val[j]){
                temp1 = sum_normalized_val[i];
                sum_normalized_val[i] = sum_normalized_val[j];
                sum_normalized_val[j] = temp1;
                temp2 = country_index[i];
                country_index[i] = country_index[j];
                country_index[j] = temp2;
                }
            }
        }
    }
    
    // Function for computing the sum of normalized data for each factor
    function get_sum_norm_result(){
        var sum = 0.0;
        for(var i = 0; i<6; i++){
            for(var j = 0; j<5; j++){
                sum += list_normalized_val[i][j]; 
            }
        sum_normalized_val[i]= sum;
        sum = 0.0
        }
    }

    // Function for computing the sum of slider values each time it is changed
    function getSumSliderValues(){
        var s_sum = 0.0;
        for(var i = 0; i<slider_values.length; i++){
            s_sum += slider_values[i];
        }
        return s_sum;
    }

    // Function for removing previous markers before creating new ones
    function removeMarker(){
        mymap.removeLayer(marker1);
        mymap.removeLayer(marker2);
        mymap.removeLayer(marker3);
        mymap.removeLayer(marker4);
        mymap.removeLayer(marker5);
        mymap.removeLayer(marker6);
    }

    // Function for adding markers on each country
    function addMarkers(order){
        marker1 = L.marker([51.260197,4.402771]).bindTooltip(String(order[0]), 
        {permanent: true, direction: 'top'});
        marker1.addTo(mymap);   

        marker2 = L.marker([46.7111,1.7191]).bindTooltip(String(order[1]), 
        {permanent: true, direction: 'top'});
        marker2.addTo(mymap);     

        marker3 = L.marker([51.1642,10.4541]).bindTooltip(String(order[2]), 
        {permanent: true, direction: 'top'});
        marker3.addTo(mymap);   

        marker4 = L.marker([41.8719,12.5674]).bindTooltip(String(order[3]), 
        {permanent: true, direction: 'top'});
        marker4.addTo(mymap); 

        marker5 = L.marker([49.8153,6.1333]).bindTooltip(String(order[4]), 
        {permanent: true, direction: 'top'});
        marker5.addTo(mymap);   

        marker6 = L.marker([52.370216,4.895168]).bindTooltip(String(order[5]), 
        {permanent: true, direction: 'top'});
        marker6.addTo(mymap);
    }

    // Function for displaying countries' names after sorting them according to weights in slider ranges    
    function initializeCountryOrder(order){
        document.getElementById("first").innerHTML = list_countryNames[order[0]-1];
        document.getElementById("second").innerHTML = list_countryNames[order[1]-1];
        document.getElementById("third").innerHTML = list_countryNames[order[2]-1];
        document.getElementById("fourth").innerHTML = list_countryNames[order[3]-1];
        document.getElementById("fifth").innerHTML = list_countryNames[order[4]-1];
        document.getElementById("sixth").innerHTML = list_countryNames[order[5]-1];     
    }