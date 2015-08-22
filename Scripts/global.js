var g;

Array.prototype.contains = function (obj) {
    return this.indexOf(obj) >= 0;
}

$('button').click(function () {
    var button = $(this);

    if (button.hasClass('single')) {
        button.siblings().removeClass('selected');
        button.addClass('selected');
    } else if (button.hasClass('multi')) {
        if (button.hasClass('selected')) {
            button.removeClass('selected');
        } else {
            button.addClass('selected');
        }
    }
});

function getOptions(selector) {
    var o = new Array();

    $(selector).each(function () {
        o.push($(this).data('value'));
    });

    return o;
}

$('button.action.toggle').click(function () {
    if ($('.not-visible').length > 0) {
        $('.not-visible').addClass('visible').removeClass('not-visible');
    } else {
        $('.visible').addClass('not-visible').removeClass('visible');
    }
});

$('button.action.create').click(function () {
    $('.toggle').show();
    $('#table').show();
    $('#quiz').hide();
    $('.button-group quiz').hide();

    $('#table').html(g.createTable(
        getOptions('button.state.selected'),
        getOptions('button.adjectives.selected'),
        getOptions('button.nouns.selected'),
        getOptions('button.cases.selected'),
        getOptions('button.amount.selected')
    ));
});

$('button.action.quiz').click(function () {
    doQuiz();
});

$('.button-group.quiz .new-question').on('click', function () {
    doQuiz();
});

$('.button-group.quiz .show-answer').on('click', function () {
    showQuizAnswer();
});

$(window).on('keyup', function (e) {
    if ($('#table').is(':visible')) {
        return;
    }

    switch(e.which) {
        case 90:
        case 88:
        case 67:
        case 81:
            doQuiz();
            break;

        case 32:
            showQuizAnswer();
            break;
    }
});

function showQuizAnswer() {
    $('#quiz .answer').css('color', '#000');
};

function doQuiz() {
    $('.toggle').hide();
    $('#table').hide();
    $('#quiz').show();
    $('.button-group.quiz').show();

    $('#quiz').html(g.quiz(
        getOptions('button.state.selected'),
        getOptions('button.adjectives.selected'),
        getOptions('button.nouns.selected'),
        getOptions('button.cases.selected')
    ));
}

$(function () {
    g = new generator();
});