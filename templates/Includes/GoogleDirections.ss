<a name="route" id="route"></a>
<div id="MapHolder" style="display:none;width:100%;">

	<div id="RouteForm">
		<h3><% _t('GOOGLEDIRECTIONS.DIRECTIONS','Route description') %></h3>
		<form action="$Link" method="POST">
			<fieldset>
				<div class="field" style="float:left;">
					<input style="padding: 4px 5px;" class="text small" type="text" id="RouteStart" value="<% _t('GOOGLEDIRECTIONS.ORIGIN') %>">
				</div>
				<div class="Actions">
					<input id="SubmitOrigin" type="submit" value="<% _t('GOOGLEDIRECTIONS.SHOWDIRECTIONS','Show route') %>" class="action" />
					<input id="PrintRoute" type="button" value="<% _t('GOOGLEDIRECTIONS.PRINT','Print route') %>" class="action" style="display:none;">
				</div>	
			</fieldset>
		</form>
	</div>
	<div id="MapCanvas" style="width:1005;height:400px;border:2px solid red;"></div>
	<div id="DirectionsPanel"></div>
</div>