relatives = new Mongo.Collection('relatives');
names = new Mongo.Collection('names')
if (Meteor.isClient) {
    Template.navbar.events({
        "click #logout": function() {

            Meteor.logout();
        }
    });
    Router.route('/login');
    Router.route('/register');
    Router.route('/profile');
    Router.route('/map');
    Router.route('/', function() {
        this.render('home');
    });
    Template.body.helpers({
        "emergency": function() {

        }
    });

    Template.map.rendered = function() {
        if (!this.rendered) {
            GV_Map();
            this.rendered = true;
        }
    };

    Template.login.events({
        "submit .loginForm": function(event) {
            event.preventDefault();
            Meteor.loginWithPassword($(event.target.email).val(), $(event.target.password).val(), function(error) {
                $(event.target.email).val("");
                $(event.target.password).val("");
                if (error) {
                    var alert = $(event.target).children(".alert-danger");
                    alert.text(error.message);
                    alert.slideDown(500).delay(1500).slideUp(500);
                } else {
                    console.log("successful");
                }
            });
        }
    });
    Template.register.events({
        "submit .registerForm": function(event) {
            event.preventDefault();
            Accounts.createUser({
                email: $(event.target.email).val(),
                password: $(event.target.password).val(),
            }, function(error) {
                $(event.target.email).val("");
                $(event.target.password).val("");
                if (error) {
                    var alert = $(event.target).children(".alert-danger");
                    alert.text(error.message);
                    alert.slideDown(500).delay(1500).slideUp(500);
                } else {
                    console.log("successful");
                }
            });
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        process.env.MAIL_URL = 'smtp://postmaster%40sandbox29f4f46d81914a8bbfa57bb4b4e66cc2.mailgun.org:d4bc6c2bf23fda0d32c74aa655288688@smtp.mailgun.org:587';
    });
    Accounts.config({
        sendVerificationEmail: true
    });
}