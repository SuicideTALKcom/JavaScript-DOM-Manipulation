var tableData = data;


var table = d3.select("table");
var tbody = d3.select("tbody");


function populateData(dataset){
    dataset.forEach(attr => {
    var row = tbody.append("tr");
    Object.entries(attr).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
      });
    });
};


populateData(tableData);


function resetTable(){
    table.selectAll("td").remove();
};


var filter = d3.select("#filter-btn");


filter.on("click", function() {
    d3.event.preventDefault();

    var dateInput = d3.select("#datetime");
    var cityInput = d3.select("#city");
    var stateInput = d3.select("#state");

    var dateValue = dateInput.property("value");
    var cityValue = cityInput.property("value");
    var stateValue = stateInput.property("value");

    var filter = [{
        'datetime': [],
        'city': [],
        'state': [],
        'country': [],
        'shape': [],
        'minutes': [],
        'comments': []
    }];
    
	
    if(dateValue !== "")
    {
    filter = tableData.filter(observation => observation.datetime === dateValue);
    }
    else
    {
        filter = tableData;
    }

	
    if(cityValue !== "")
    {
    var cityFilter = filter.filter(observation => observation.city === cityValue);
    }
    else
    {
        var cityFilter = filter;
    }

	
    if(stateValue !== "")
    {
    var stateFilter = cityFilter.filter(observation => observation.state === stateValue);
    }
    else
    {
        var stateFilter = cityFilter;
    }
  
	
    if(dateValue === "" && cityValue === "" && stateValue === "")
    {
        populateData(stateFilter);
    }

	
    resetTable();
    
	
    populateData(stateFilter);
     
});


var clearFields = d3.select("#clearfields-btn");


clearFields.on("click", function() {
    d3.select("#datetime").property("value").clear();
    d3.select("#city").property("value").clear();    
}); 
