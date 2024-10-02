function start_search(text)
{
	if(text)
	{
		requestUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6009579737f2e431b77c33d86ac4f420&text="+text+"&sort=interestingness-desc&per_page=10&format=json&nojsoncallback=1";
		
		request = $.ajax({
			url: requestUrl,
			method: "GET",
			dataType: "json",
			async: true,
			crossDomain: true
		});
		 
		request.done(function( data ) {
			
			$("#result").html("");
			
			$.each( data.photos.photo, function( i, gp )
			{
				var farmId = gp.farm;
				var serverId = gp.server;
				var id = gp.id;
				var secret = gp.secret;

				//console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

				$("#result").append('<div class="col-sm-6 col-lg-3 mb-3"><div class="card"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" /></div></div>');
			});
		});
		 
		request.fail(function( jqXHR, textStatus )
		{
			$('#result').html( "Ошибка выполнения запроса: " + textStatus );
		});
		
	}
	else
		$('#result').html('Введите текст для поиска.');
	
	return true;
}