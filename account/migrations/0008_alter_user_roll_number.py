# Generated by Django 4.1.2 on 2023-05-09 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_alter_user_mobile_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='roll_number',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]