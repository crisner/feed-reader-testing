/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test to check if url is defined and is not empty
         * in each feed of the allFeeds object
         */
        it('URL should be defined and should not be empty', function() {
            allFeeds.map(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This is a test to check if name is defined and is not empty
         * in each feed of the allFeeds object
         */
        it('name should be defined and should not be empty', function() {
            allFeeds.map(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* This is a test suite for menu functions */
    describe('The menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
        it('Menu should be hidden by default', function() {
            let menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('Menu should toggle visibility on click', function() {
            let menuIcon = $('.menu-icon-link');
            let menuHidden = true;
            menuIcon.click();
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).not.toBe(true);
            menuIcon.click();
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });
    });

    /* This is a new test suiteto test initial entries */
    describe('Initial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('The feed container should have atleast a single element', function(){
            let entries =  $('.feed > a');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /* This is a new test suite to test
     * if new feed is loaded by the loadFeed function
     */
    describe('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function the content is different.
         */
        let firstFeed;
        let nextFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed > a')[0].textContent; // Save the first entry from the initial feed
                loadFeed(1, function() {
                    nextFeed = $('.feed > a')[0].textContent; // Save the first entry from the current feed
                    done();
                });
            });
        });
        it('The feed content should change upon new feed selection', function(){
            // Check against the first entries to check if content has changed
            expect(firstFeed).not.toEqual(nextFeed);
        });
    });
}());
