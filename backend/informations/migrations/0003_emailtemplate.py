# Generated by Django 5.0.6 on 2024-06-21 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('informations', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField(max_length=2500)),
            ],
        ),
    ]