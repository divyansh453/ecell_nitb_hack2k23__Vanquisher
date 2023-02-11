from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.


class UserModelAdmin(BaseUserAdmin):
 

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','email','roll_number', 'full_name','isverified', 'is_admin')
    list_filter = ('is_admin','isverified')
    fieldsets = (
        ('User Credentials', {'fields': ('roll_number','mobile_number','email', 'password')}),
        ('Personal info', {'fields': ('full_name','age','isverified','gender','branch','course')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('roll_number','mobile_number','email', 'full_name','branch','course','age','gender','isverified', 'password1', 'password2'),
        }),
    )
    search_fields = ('email','id','mobile_number','roll_number')
    ordering = ('id',)
    filter_horizontal = ()


# Now register the new UserAdmin...
admin.site.register(User, UserModelAdmin)
# Register your models here.
