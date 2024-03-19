$(function() {
    var tKillNames = []; // Initialize as an empty array
    var weapons = ["ak47", "deagle", "awp" /*, "g3sg1", "m4a4"*/]; // add or remove images of weapons
    var $killFeedContainer = $('.kill-feed');
    var $killFeedElement = $('.kill-feed > div').hide();

    function fetchTKillNames() {
        fetch('tKillNames.txt')
            .then(response => response.text())
            .then(data => {
                tKillNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
                if (tKillNames.length > 0) {
                    console.log('tKillNames loaded:', tKillNames);
                    setInterval(handleKillFeed, 750); // Start the kill feed loop after names are loaded
                } else {
                    console.log('No tKillNames to display.');
                }
            })
            .catch(error => console.error('Error fetching tKillNames:', error));
    }

    // Initial fetch of tKillNames
    fetchTKillNames();

    function handleKillFeed() {
        if (tKillNames.length === 0) return; // No names to display

        var $newFeedElement = $killFeedElement.clone();
        var randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
        var randomCTName = ctKillNames[Math.floor(Math.random() * ctKillNames.length)];
        var randomTKillName = tKillNames[Math.floor(Math.random() * tKillNames.length)];

        $newFeedElement.find('.weapons img:first-child').attr('src', './images/' + randomWeapon + '.png'); //drawing a weapon
        $newFeedElement.find('.t').text(randomTKillName); // drawing a "teammate"
        $newFeedElement.find('.ct').text(randomCTName); // drawing a "enemy"

        $killFeedContainer.append($newFeedElement.show().delay(2000).fadeOut(1000, function() { // drawing a container
            $(this).remove();
        }));
    }

    $(document).on("contextmenu", function(e) {
        e.preventDefault();
    });
});