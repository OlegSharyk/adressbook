var contactList = [];
var groupsObj = {};
var contactListElement;
var contactForm;
var groupsSelect;
var searchInput;

function initContactList() {
    contactList = [
        { 'id': 1, 'name': 'Louis', 'surname': 'Louis IIfasdf', 'phone': '894853409', 'email': 'dsfsdf@mailr.ru', 'group':'Toronto office'},
        { 'id': 2, 'name': 'Louis', 'surname': 'Suares', 'phone': '345435454', 'email': 'jhkjhkj@mailr.ru', 'group':'Toronto office'},
        { 'id': 3, 'name': 'Louis', 'surname': 'Brown', 'phone': '34235454656778', 'email': 'sjask@mailr.ru', 'group': 'My favorite'},
        { 'id': 4, 'name': 'Louis', 'surname': 'Doe', 'phone': '89783231212', 'email': 'asdsad@mailr.ru', 'group': 'Family'},
        { 'id': 5, 'name': 'Louis', 'surname': 'Black', 'phone': '632312312312', 'email': 'dfhjhjh@mailr.ru', 'group': 'Family'},
        { 'id': 6, 'name': 'Louis', 'surname': 'Blue', 'phone': '89447798853409', 'email': 'nmcvcvzc@mailr.ru', 'group': 'Family'},
        { 'id': 7, 'name': 'Louis', 'surname': 'White', 'phone': '32321243543', 'email': 'sjaxccxvvbvcbsk@mailr.ru', 'group': 'My favorite'},
        { 'id': 8, 'name': 'Louis', 'surname': 'Purple', 'phone': '32131246776978078', 'email': 'szxczxczxjask@mailr.ru', 'group': 'Football'},
        { 'id': 9, 'name': 'Louis', 'surname': 'Green', 'phone': '23167878767465', 'email': 'xcvcxbvx@mailr.ru', 'group': 'Football'},
        { 'id': 10, 'name': 'Louis', 'surname': 'Benq', 'phone': '2435547679879', 'email': 'cxzvxcbnbv@mailr.ru', 'group': 'Football'},
        { 'id': 11, 'name': 'Louis', 'surname': 'Asus', 'phone': '346568678967', 'email': 'vzcxzbvx@mailr.ru', 'group': 'New York'},
        { 'id': 12, 'name': 'Louis', 'surname': 'Louis', 'phone': '432144657658', 'email': 'czxbxvbcv@mailr.ru', 'group': 'New York'}
    ];
    
    for (var i = 0; i < contactList.length; i++) {
        appendContact(contactList[i]);
    }

    contactListElement.find('li:first').addClass('active');
    renderContact(contactList[0]);
};

function initGroupList() {
    for (var i = 0; (i < contactList.length); i++) {
        groupsObj[contactList[i].group] = null;
	}
    renderGroupList();
}

function renderGroupList() {
    groupsSelect.find('option:not(.default)').remove();
    for (var key in groupsObj) {
        groupsSelect.append('<option>' + key + '</option>');
    }
}

function updateGroupList(group) {
	console.log(group);
	if (group !== '') {
		groupsObj[group] = null;
		renderGroupList();
	} else {

	}
}


function appendContact(contact, isActive) {
    var element = $('<li data-id="' + contact.id + '" >' + contact.name + ' ' + contact.surname + '</li>');
    if (isActive) {
        contactListElement.find('li').removeClass('active');
        element.addClass('active');
    }
    contactListElement.append(element);
}


function updateContact(contact) {
    contactListElement.find('li[data-id=' + contact.id + ']').text(contact.name + ' ' + contact.surname);
    var index = findContactIndexById(contact.id);
    contactList[index] = contact;
}

function renderContact(contact) {
    var personInfo = $('#person');
    var name = $('.jsPersonName', personInfo);
    var phone = $('.jsPersonPhone', personInfo);
    var email = $('.jsPersonEmail', personInfo);
    var group = $('.jsPersonGroup', personInfo);

    name.text(contact.name + ' ' + contact.surname);
    phone.text(contact.phone);
    email.text(contact.email);
    group.text(contact.group);
}


function validateForm() {
    var isValidate = false;
    var Form = $('.jsValidateForm');
    var valiadateInput = Form.find('input[data-required=required]');

    valiadateInput.each(function () {
        var thisInput = $(this);
        var thisParent = thisInput.parent('.b-input-i');
        if (thisInput.val() == '') {
            thisParent.addClass('b-input-i_error');
            thisInput.addClass('error');
        } else {
            thisParent.removeClass('b-input-i_error');
            thisInput.removeClass('error');
        }
    });

    if (valiadateInput.hasClass('error')) {
        isValidate = false;
    } else {
        isValidate = true;
    }
    return isValidate;
}

function findContactIndexById(id) {
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].id == id) {
            return i;
        }
    }
}

function findContactById(id) {
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].id == id) {
            return contactList[i];
        }
    }
}

function findContacts(searchText) {
    var contacts = [];
    for (var i = 0; i < contactList.length; i++) {
        var searchTarget = contactList[i].name + ' ' + contactList[i].surname;
        if (searchTarget.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            contacts.push(contactList[i]);
        }
    }
    return contacts;
}

function filterContacts(searchText, group) {
    var contacts = [];
    for (var i = 0; i < contactList.length; i++) {
        if(matchName(contactList[i], searchText) &&
           matchGroup(contactList[i], group)){
            contacts.push(contactList[i]);
        }
    }
    return contacts;
}

function matchName(contact, searchText) {
    var searchTarget = contact.name + ' ' + contact.surname;
    return searchTarget.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
}

function matchGroup(contact, group) {
    return !group || contact.group === group;
}

function refreshContactsList (){
    var selectGroupValue = groupsSelect.val();
    var searchText = searchInput.val();
    var searchTextParent = searchInput.parent();
    var contacts = filterContacts(searchText,selectGroupValue);
    if (contacts.length) {
        searchTextParent.removeClass('no-result');
    } else {
        searchTextParent.addClass('no-result');
    }
    showContacts(contacts);
}

function getSelectedContact() {
    return contactListElement.find('.active');
}


function initClearSearch() {
    var search = $('.adressbook__search');
    var searchInput = $('.b-input', search);
    var searchInputWrap = $('.b-input-i', search);
    searchInput.click(function() {
        searchInputWrap.removeClass('no-result');
    });
}

function showAllContacts() {
    contactListElement.find('li').show();
}

function filterContactsByGroup(group) {
    var contacts = [];
    for (var i = 0; i < contactList.length; i++) {
        if (group == contactList[i].group) {
            contacts.push(contactList[i]);
        }
    }
    return contacts;
}

function showContacts(contacts) {
    contactListElement.find('li').hide();
    for (var i = 0; i < contacts.length; i++) {
        contactListElement.find('li[data-id=' + contacts[i].id + ']').show();
    }
    contactListElement.find('li:visible:first').click();
}


$(function () {
    contactListElement = $('#contactList');
    contactForm = new contactFormClass();
    groupsSelect = $('.jsGroupsSelect');
    searchInput = $('.jsSearchInput');

    initContactList();
    initGroupList();
	initClearSearch();

    $('.jsSaveBtn').click(function (e) {
        e.preventDefault();
        /*serializeArray()*/
        var contact = contactForm.getContact();

        if (validateForm()) {
			if (contact.id) {
				updateContact(contact);
			} else {
				var newId = contactList.length ? contactList[contactList.length - 1].id + 1 : 0;
				contact.id = newId;
				contactList.push(contact);
				appendContact(contact, true);
			}
			renderContact(contact);
			contactForm.reset();
//		    updateGroupList(contact.group);
            refreshContactsList ();
			$('.jsAdressbook').removeClass('edit-open');
		} 
    });

    $(".jsAddBtn").click(function (e) {
        e.preventDefault();
		$('.jsAdressbook').addClass('edit-open')
    });

    $(".jsEditBtn").click(function (e) {
        var selected = getSelectedContact();
        var id = selected.attr('data-id');
        var contact = findContactById(id);
        contactForm.setContact(contact);
        e.preventDefault();
		$('.jsAdressbook').addClass('edit-open');
    });

    $(".jsRemoveBtn").click(function(e) {
        var selected = getSelectedContact();
        var id = selected.attr('data-id');
        var index = findContactIndexById(id);
        contactList.splice(index, 1);
       
        var next = selected.next('li');
       
        if (next.length > 0) {
            next.click();
        } else {
            var prev = selected.prev('li');
            if (prev.length > 0) {
                prev.click();
            } else {
                renderContact({ 'id': '', 'name': '', 'surname': '', 'phone': '', 'email': '' });
            }
        }
        selected.remove();
		$('.jsAdressbook').removeClass('edit-open');
        e.preventDefault();
    });

	$(".jsBtnSearch").click(function(e) {
		e.preventDefault();
		$(this).parent().removeClass('no-result');
		var searchInputText = $(this).siblings('.b-input').val();

	    var contacts = findContacts(searchInputText);
	    if (contacts.length) {
	        showContacts(contacts);
	    } else {
	        $(this).parent().addClass('no-result');
	    }
	    $('.jsAdressbook').removeClass('edit-open');
	});

    searchInput.keyup(function(e){
		$(this).parent().removeClass('no-result');
//		var searchInputText = $(this).val();

        refreshContactsList ();
		$('.jsAdressbook').removeClass('edit-open');
	});

	$('.jsFormAddClose').click(function(e){
		e.preventDefault();
		$('.b-input-i').removeClass('b-input-i_error');
		$('.jsAdressbook').removeClass('edit-open');
		contactForm.reset();
	});

    contactListElement.on({
        'click': function () {
			if($('.jsAdressbook').hasClass('edit-open')){
				$('.jsFormAddClose').click();
			}
            var listItem = $(this);
            var contact = findContactById(listItem.attr('data-id'));
            renderContact(contact);
            contactListElement.find('li').removeClass('active');
            listItem.addClass('active');
        }
    }, 'li');

    groupsSelect.change(function() {
        var option = $(this).find(':selected');
        refreshContactsList ();

//        if (option.hasClass('default')) {
//            showAllContacts();
//        } else {
//            var contacts = filterContactsByGroup(option.val());
//            if (contacts.length) {
//                showContacts(contacts);
//            }
//        }
    });
});

function contactFormClass() {
    var form = $('.jsForm');
    var name = $('.jsName', '.jsForm');
    var surname = $('.jsSurname', '.jsForm');
    var phone = $('.jsPhone', '.jsForm');
    var email = $('.jsEmail', '.jsForm');
    var id = $('.jsId', '.jsForm');
    var group = $('.jsGroup', '.jsForm');

    return {
        setContact: setContact,
        getContact: getContact,
        reset: reset
    };

    function setContact(contact) {
        name.val(contact.name);
        surname.val(contact.surname);
        phone.val(contact.phone);
        email.val(contact.email);
        id.val(contact.id);
        group.val(contact.group);
    }

    function getContact() {
        return { 'id': id.val(), 'name': name.val(), 'surname': surname.val(), 'phone': phone.val(), 'email': email.val(), 'group': group.val() };
    }

    function reset() {
        $('input[type="text"],input[type="hidden"]', form).val('');
    }

}
