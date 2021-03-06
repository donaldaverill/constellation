Template.Constellation_config_header.events({
  'click .Constellation_Minimize' : function (e) {
    e.stopPropagation();
    ConstellationDict.set("Constellation_currentTab", null);  
  },
  'click .Constellation_FullScreen' : function (e) {
    e.stopPropagation();
    Constellation.toggleFullScreen();
  }
});

Template.Constellation_config_view.helpers({
  installedTabs: function () {
    return _.initial(ConstellationDict.get('Constellation_tabs'));
  },
  tabActive: function () {
    return this.id === 'constellation_plugin_config' || TabStates.get(this.id);
  }
});

Template.Constellation_config_view.events({
  'change input' : function (evt, tmpl) {
    var key = this.id.replace(/_/g,"-");
    var value = evt.target.checked;
    TabStates.set(this.id, value);
    Meteor.defer(function() {
      localStorage[key] = value;
    });
  }
});

Template.Constellation_config_menu.events({

  'click .Constellation_config_all, click .Constellation_config_none' : function (evt, tmpl) {
	// Change the state of all collections
	var cdict = ConstellationDict.get('Constellation_tabs');
	var show = tmpl.$(evt.target).hasClass('Constellation_config_all');
	var collections = _.each(cdict, function (tab) {
	  if (tab.collection) {
		var key = tab.id.replace(/_/g,"-");
		TabStates.set(tab.id, show);
		Meteor.defer(function() {
		  localStorage[key] = show;
		});
	  }
	});
  }

});