# Generated by Django 5.0.6 on 2024-06-03 18:51

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='phone_no',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='phone_number',
            field=models.CharField(default='na', max_length=22, validators=[django.core.validators.RegexValidator(code='invalid_phone_no', message='Invalid format or phone number', regex='^\\+\\d{1,4}-\\d{6,20}$')]),
            preserve_default=False,
        ),
    ]
