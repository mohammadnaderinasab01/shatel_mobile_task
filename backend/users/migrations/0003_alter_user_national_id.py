# Generated by Django 5.0.6 on 2024-06-19 22:51

import utils.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_national_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='national_ID',
            field=models.CharField(max_length=10, validators=[utils.validators.only_int]),
        ),
    ]
