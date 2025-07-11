# Generated by Django 5.2.3 on 2025-07-06 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inbound', '0002_outboundrecord'),
    ]

    operations = [
        migrations.CreateModel(
            name='InboundRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=255)),
                ('quantity', models.PositiveIntegerField()),
                ('supplier', models.CharField(blank=True, max_length=255)),
                ('date_received', models.DateField()),
                ('remarks', models.TextField(blank=True)),
            ],
        ),
        migrations.DeleteModel(
            name='OutboundRecord',
        ),
    ]
