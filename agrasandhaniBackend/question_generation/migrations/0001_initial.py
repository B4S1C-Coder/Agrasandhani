# Generated by Django 5.0.6 on 2024-06-06 17:17

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AssociatedQuestions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('associated_hash', models.CharField(max_length=128, validators=[django.core.validators.MinLengthValidator(128)])),
                ('questions', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='UploadedDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('associated_file', models.FileField(blank=True, null=True, upload_to='uploads/')),
                ('sha512hash_file', models.CharField(max_length=128, validators=[django.core.validators.MinLengthValidator(128)])),
                ('file_exists_irl', models.BooleanField(default=False)),
            ],
        ),
    ]
