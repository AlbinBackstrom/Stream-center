
var productsURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";
var randomSixURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/random?number=6";


  function googleTranslateElementInit() { // Implementerar google translate
  new google.translate.TranslateElement({pageLanguage: 'sv', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true}, 'google_translate_element');
}

/**
 * Funktion för att hämta 6 random bilder och visa på sidan
 */
$.getJSON(randomSixURL, function (result) {


    for (var i = 0; i < result.length; i++) {
            var randomImage = $("<img>").attr("src",result[i].imageUrl).attr("id", result[i].id).addClass("styleForRandomDiv").addClass("col-md-4", "<a>");
            randomImage.appendTo($("#randomImageDiv"));
             randomImage.on("click", function() {
            window.location.href = "info.html?productId=" + this.id;

        });
    }

});



/**
 * Funktion för att hämta de tio senaste filmerna baserat på tillägsdatum (added)
 * Använder pluginet Lodash för att sortera på added och sedan lagras dessa i en
 * ny array.
 */
$.getJSON(productsURL, function (result) {

    var sorted = _.sortBy(result, "added");
    sorted.reverse();

    var newlyAdded = sorted.slice(0, 10);

    for (var i = 0; i < newlyAdded.length; i++) {
        var newlyAddedImage = $("<img>").attr("src", newlyAdded[i].imageUrl).attr("id", newlyAdded[i].id).addClass("styleForNewlyAdded");
        newlyAddedImage.appendTo($("#newlyAdded"));
        $("img").css( 'cursor', 'pointer' );

        newlyAddedImage.on("click", function() {
            window.location.href = "info.html?productId=" + this.id;

        });

    }
});
